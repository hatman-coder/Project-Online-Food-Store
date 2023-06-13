from http.client import HTTPResponse
from urllib import request
from rest_framework import viewsets, generics
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
from django.contrib.auth import authenticate, login, password_validation
from .permissions import AdminOrReadOnly
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication
from .authentication import UserAuthentication
from django.views.decorators.csrf import csrf_exempt


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]


class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

    # permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #     # Get the authenticated user
    #     user = self.request.user.id
    #
    #     # Filter orders by the authenticated user
    #     if user:
    #         return CustomerDetail.objects.filter(user_id=user)
    #     else:
    #         raise AuthenticationFailed('User not found')


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
    queryset = OrderMaster.objects.all()
    serializer_class = OrderMasterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the authenticated user
        user = self.request.user.id

        # Filter orders by the authenticated user
        if user:
            return OrderMaster.objects.filter(user_id=user)
        else:
            raise AuthenticationFailed("User not found")


class OrderDetailViewset(viewsets.ModelViewSet):
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        if user_id:
            return OrderDetail.objects.filter(order_master_id__user_id=user_id)
        else:
            raise AuthenticationFailed("User not found")


class OrderStatusViewset(viewsets.ModelViewSet):
    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = CustomerDetail.objects.all()
    serializer_class = CustomerDetailSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


class PaymentTypeViewset(viewsets.ModelViewSet):
    queryset = PaymentType.objects.all()
    serializer_class = PaymentTypeSerializer


class AddOnsViewSet(viewsets.ModelViewSet):
    queryset = AddOns.objects.all()
    serializer_class = AddOnsSerializer
    authentication_classes = []
    permission_classes = [AllowAny]


class ExpiredTokenViewSet(viewsets.ModelViewSet):
    queryset = ExpiredToken.objects.all()
    serializer_class = ExpiredTokenSerializer
    permission_classes = [IsAdminUser]


class LoginApiViewSet(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = UserProfile.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("User not found !")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password !")
        else:
            payload = {
                "id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(days=15),
                "iat": datetime.datetime.utcnow(),
            }

            token = jwt.encode(payload, "secret", algorithm="HS256")
            serializer = UserTokenSerializer(
                data={"user": user.username, "token": token}
            )
            if serializer.is_valid():
                serializer.save()
                response = Response()
                response.set_cookie(key="auth", value=token, httponly=True)
                response.data = {"jwt": token}
                return response
            else:
                return Response({"error": "Backend data corrupted"})


class LogoutApiViewSet(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        get_token = request.COOKIES.get("auth")
        if not get_token:
            return Response(
                {"error": "Login first! Invalid logout request"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ExpiredTokenSerializer(data={"token": get_token})
        if serializer.is_valid():
            serializer.save()
            response = Response()
            response.delete_cookie("auth")
            response.data = {"message": "success"}
            return response
        else:
            return Response(
                {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            )


class UserAuthViewSet(APIView):
    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)


class ChangePasswordViewSet(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer

    def update(self, request, *args, **kwargs):
        user = request.user
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        old_password = serializer.validated_data.get("old_password")
        new_password = serializer.validated_data.get("new_password")
        retype_password = serializer.validated_data.get("retype_password")
        if not user.check_password(old_password):
            return Response({"detail": "Wrong old password !"})

        if new_password != retype_password:
            return Response(
                {"detail": "Password did not match"},
                status=status.HTTP_403_FORBIDDEN,
            )

        if old_password == new_password:
            return Response(
                {
                    "detail": "Password match the old password ! Please enter a new password"
                },
                status=status.HTTP_403_FORBIDDEN,
            )
        else:
            password_validation.validate_password(password=new_password, user=user)
            user.set_password(new_password)
            user.save()

            return Response(
                {"detail": "Password Changed Successfully"}, status=status.HTTP_200_OK
            )
