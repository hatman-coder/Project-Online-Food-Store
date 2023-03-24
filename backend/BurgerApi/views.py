from http.client import HTTPResponse
from urllib import request
from rest_framework import viewsets
from .models import *
from .serializers import *
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import authentication, status
from django.contrib.auth import authenticate, login
from .permissions import AdminOrReadOnly
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = CustomerDetail.objects.all()
    serializer_class = CustomerDetailSerializer


class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AdminOrReadOnly]


class OrderMasterViewset(viewsets.ModelViewSet):
    serializer_class = OrderMasterSerializer

    def get_queryset(self):
        # Get the authenticated user
        user = self.request.user

        # Filter orders by the authenticated user
        if user:
            return OrderMaster.objects.filter(user_id=user)
        else:
            raise AuthenticationFailed('User Not found')


class OrderDetailViewset(viewsets.ModelViewSet):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer
    # permission_classes = [IsAuthenticated]


class OrderStatusViewset(viewsets.ModelViewSet):
    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer

class PaymentTypeViewset(viewsets.ModelViewSet):
    queryset = PaymentType.objects.all()
    serializer_class = PaymentTypeSerializer

class AddOnsViewSet(viewsets.ModelViewSet):
    queryset = AddOns.objects.all()
    serializer_class = AddOnsSerializer




class LoginApiViewSet(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = UserProfile.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found !')

        if not user.check_password(password):
            raise  AuthenticationFailed('Incorrect password !')
        else:
            payload = {
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=15),
                'iat': datetime.datetime.utcnow()
             }

            token = jwt.encode(payload, 'secret', algorithm='HS256')

            response = Response()
            response.set_cookie(key='auth', value=token, httponly=True)
            response.data = {
                'jwt': token
            }
            return response

class UserApiViewSet(APIView):
    def get(self, request):
        token = request.COOKIES.get('auth')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        else:
            user = UserProfile.objects.filter(id=payload['id']).first()
            serializer = UserProfileSerializer(user)
            return Response(serializer.data)

class LogoutApiViewSet(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response