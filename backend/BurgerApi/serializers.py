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


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = '__all__'


# class OrderMasterSerializer(serializers.ModelSerializer):
#     customer_detail = CustomerDetailSerializer()
#     order_status = OrderStatusSerializer()
#
#     class Meta:
#         model = OrderMaster
#         fields = '__all__'
#
#     def create(self, validated_data):
#         customer_detail_data = validated_data.pop('customer_detail')
#         customer_detail = CustomerDetail.objects.create(**customer_detail_data)
#         order_status_data = validated_data.pop('order_status')
#         order_status = OrderStatus.objects.create(**order_status_data)
#         order_master = OrderMaster.objects.create(
#             customer_detail=customer_detail,
#             order_status=order_status,
#             **validated_data,
#             delivery_time=(datetime.now() + timedelta(minutes=30)).strftime('%H:%M:%S')
#         )
#         return order_master
#
#
#
#
#     def update(self, instance, validated_data):
#         nested_customer_detail = self.fields['customer_detail']
#         nested_order_status = self.fields['order_status']
#         nested_customer_detail_instance = instance.customer_detail
#         nested_order_status_instance = instance.order_status
#         nested_customer_detail_data = validated_data.pop('customer_detail')
#         nested_order_status_data = validated_data.pop('order_status')
#         nested_customer_detail.update(nested_customer_detail_instance, nested_customer_detail_data)
#         nested_order_status.update(nested_order_status_instance, nested_order_status_data)
#         return super(OrderMasterSerializer, self).update(instance, validated_data)

# class OrderDetailSerializer(serializers.ModelSerializer):
#     order_master_id = OrderMasterSerializer()
#
#     class Meta:
#         model = OrderDetail
#         fields = '__all__'
#
#     def create(self, validated_data):
#         product_id = validated_data.pop('product_id')
#         product_price = validated_data.pop('product_price')
#
#         order_master_data = validated_data.pop('order_master_id')
#         order_master_id = OrderMasterSerializer.create(OrderMasterSerializer(), validated_data=order_master_data)
#
#         return OrderDetail.objects.create(
#             order_master_id=order_master_id,
#             product_id=product_id,
#             product_price=product_price,
#         )
#
#
#
#     def update(self, instance, validated_data):
#         nested_serializer = self.fields['order_master_id']
#         nested_instance = instance.order_master_id
#         nested_data = validated_data.pop('order_master_id')
#         nested_serializer.update(nested_instance, nested_data)
#         return super(OrderDetailSerializer, self).update(instance, validated_data)



class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ['product_id', 'product_price', 'add_ons']
        read_only_fields = ['order_master_id']




class OrderMasterSerializer(serializers.ModelSerializer):
    order_detail = OrderDetailSerializer(many=True)
    customer_detail = CustomerDetailSerializer()
    order_status = OrderStatusSerializer()

    class Meta:
        model = OrderMaster
        fields = '__all__'
        read_only_fields = ['id', 'order_no', 'delivery_time']

    def create(self, validated_data):
        order_detail_data = validated_data.pop('order_detail')

        customer_detail_data = validated_data.pop('customer_detail')
        customer_detail = CustomerDetail.objects.create(**customer_detail_data)

        order_status_data = validated_data.pop('order_status')
        order_status = OrderStatus.objects.create(**order_status_data)

        order_master = OrderMaster.objects.create(
            customer_detail=customer_detail,
            order_status=order_status,
            **validated_data,
            delivery_time=(datetime.now() + timedelta(minutes=30)).strftime('%H:%M:%S')
        )

        for item in order_detail_data:
            OrderDetail.objects.create(
                order_master_id=order_master,
                **item
            )

        return order_master
























