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
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication
from  .authentication import UserAuthentication


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]

class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = CustomerDetail.objects.all()
    serializer_class = CustomerDetailSerializer
    permission_classes = [IsAuthenticated]


class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny, AdminOrReadOnly]


class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes = [UserAuthentication]
    permission_classes = [AdminOrReadOnly]

class OrderMasterViewset(viewsets.ModelViewSet):
    serializer_class = OrderMasterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the authenticated user
        user = self.request.user.id

        # Filter orders by the authenticated user
        if user:
            return OrderMaster.objects.filter(user_id=user)
        else:
            raise AuthenticationFailed('User not found')

class OrderDetailViewset(viewsets.ModelViewSet):
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        if user_id:
            return OrderDetail.objects.filter(order_master_id__user_id=user_id)
        else:
            raise AuthenticationFailed('User not found')


class OrderStatusViewset(viewsets.ModelViewSet):
    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer

class PaymentTypeViewset(viewsets.ModelViewSet):
    queryset = PaymentType.objects.all()
    serializer_class = PaymentTypeSerializer

class AddOnsViewSet(viewsets.ModelViewSet):
    queryset = AddOns.objects.all()
    serializer_class = AddOnsSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]

class ExpiredTokenViewSet(viewsets.ModelViewSet):
    queryset = ExpiredToken.objects.all()
    serializer_class = ExpiredTokenSerializer
    permission_classes = [IsAdminUser]



class LoginApiViewSet(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]
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

            token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')
            serializer = UserTokenSerializer(data={
                'user': user.username,
                'token': token
            })
            if serializer.is_valid():
                serializer.save()
                response = Response()
                response.set_cookie(key='auth', value=token, httponly=True)
                response.data = {
                    'jwt': token
                }
                return response
            else:
                return Response({
                    'error': 'Backend data corrupted'
                })


#
# class LogoutApiViewSet(APIView):
#     def post(self, request):
#         response = Response()
#         response.delete_cookie('jwt')
#         response.data = {
#             'message': 'success'
#         }
#         return response



# class LogoutApiViewSet(APIView):
#     authentication_classes = [SessionAuthentication]
#     permission_classes = [AllowAny]
#     def post(self, request):
#         get_token = request.COOKIES.get('auth')
#         serializer = ExpiredTokenSerializer(data={
#             'token' : get_token
#         })
#         if serializer.is_valid() and get_token != '':
#             serializer.save()
#             response = Response()
#             response.delete_cookie('auth')
#             response.data = {
#                 'message': 'success'
#             }
#             return response
#         else:
#             # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#             return Response({
#               'error':  'Login first ! Invalid logout request'
#             })

class LogoutApiViewSet(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        get_token = request.COOKIES.get('auth')
        if not get_token:
            return Response({
                'error': 'Login first! Invalid logout request'
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = ExpiredTokenSerializer(data={
            'token': get_token
        })
        if serializer.is_valid():
            serializer.save()
            response = Response()
            response.delete_cookie('auth')
            response.data = {
                'message': 'success'
            }
            return response
        else:
            return Response({
                'error': 'Invalid token'
            }, status=status.HTTP_400_BAD_REQUEST)



class UserAuthViewSet(APIView):

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
