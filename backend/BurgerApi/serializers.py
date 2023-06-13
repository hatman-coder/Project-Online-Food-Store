from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password
from datetime import datetime, timedelta
import json


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'email', 'password', 'username', 'phone')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }}

    def create(self, validated_data):
        hash_password = make_password(validated_data['password'])
        user = UserProfile.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            username=validated_data['username'],
            phone=validated_data['phone']
        )
        return user


class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserToken
        fields = '__all__'
        extra_kwargs = {
            'user': {'write_only': True},
            'token': {'write_only': True}
        }


class ExpiredTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpiredToken
        fields = '__all__'
        extra_kwargs = {
            'token': {'write_only': True}
        }


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'


class AddOnsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddOns
        fields = '__all__'


class PaymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentType
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        category_data = validated_data.pop('category')
        product, created = Product.objects.update_or_create(
            img=validated_data.pop('img'),
            name=validated_data.pop('name'),
            price=validated_data.pop('price'),
            category=category_data,
            in_stock=validated_data.pop('in_stock')
        )
        return product


class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerDetail
        fields = '__all__'
        read_only_fields = ['order_master_id']



class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ['order_placed', 'order_pending', 'order_confirmed', 'order_preparation_on_going', 'out_for_delivery', 'delivered']
        read_only_fields = ['order_master_id']


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ['product_id', 'product_price', 'add_ons', 'total_add_ons_price']
        read_only_fields = ['order_master_id']


# class OrderMasterSerializer(serializers.ModelSerializer):
#     order_detail = OrderDetailSerializer(many=True)
#     customer_detail = CustomerDetailSerializer()
#     order_status = OrderStatusSerializer()
#
#     class Meta:
#         model = OrderMaster
#         fields = '__all__'
#         read_only_fields = ['id', 'order_no', 'delivery_time']
#
#     def create(self, validated_data):
#
#         order_detail_data = validated_data.pop('order_detail')
#         customer_detail_data = validated_data.pop('customer_detail')
#         order_status_data = validated_data.pop('order_status')
#
#
#         #Creating OrderMaster Object
#         order_master = OrderMaster.objects.create(
#             **validated_data,
#             delivery_time=(datetime.now() + timedelta(minutes=30)).strftime('%H:%M:%S')
#         )
#
#         # Creating Customer Object
#         customer_detail = CustomerDetail.objects.create(order_master_id=order_master, **customer_detail_data)
#
#
#         #Creating OrderStatus Object
#         order_status = OrderStatus.objects.create(order_master_id=order_master, **order_status_data)
#
#         #Looping through order detail array and Saving OrderDetail Object
#         for item in order_detail_data:
#             OrderDetail.objects.create(
#                 order_master_id=order_master,
#                 **item
#             )
#
#         return order_master


class OrderMasterSerializer(serializers.ModelSerializer):
    order_detail = OrderDetailSerializer(many=True)
    customer_detail = CustomerDetailSerializer(many=True)
    order_status = OrderStatusSerializer(many=True)

    class Meta:
        model = OrderMaster
        fields = '__all__'
        read_only_fields = ['id', 'order_no', 'delivery_time']

    def create(self, validated_data):
        order_detail_data = validated_data.pop('order_detail')
        customer_detail_data = validated_data.pop('customer_detail')
        order_status_data = validated_data.pop('order_status')

        order_master = OrderMaster.objects.create(
            **validated_data,
            delivery_time=(datetime.now() + timedelta(minutes=30)).strftime('%H:%M:%S')
        )

        #Creating Order Detail Object
        for order_detail in order_detail_data:
            OrderDetail.objects.create(order_master_id=order_master, **order_detail)

        #Creating Customer Detail Object
        for customer_detail in customer_detail_data:
            CustomerDetail.objects.create(order_master_id=order_master, **customer_detail)

        #Creating Order Status Object
        for order_status in order_status_data:
            OrderStatus.objects.create(order_master_id=order_master, **order_status)

        return order_master


class ChangePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(
        style = {'input_type': 'password'},
        write_only = True,
        required = True,
    )
    new_password = serializers.CharField(
        style = {'input_type': 'password'},
        write_only = True,
        required = True,
    )
    retype_password = serializers.CharField(
        style = {'input_type': 'password'},
        write_only = True,
        required = True,
    )