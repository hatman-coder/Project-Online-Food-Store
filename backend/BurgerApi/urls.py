from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import *
from django.conf.urls.static import static
from django.conf import settings
from BurgerApi import views


router = DefaultRouter()
router.register(r'user', UserProfileViewSet)
router.register(r'product', ProductViewset)
router.register(r'category', CategoryViewset)
router.register(r'addOns', AddOnsViewSet)
router.register(r'orderDetail', OrderDetailViewset, basename='orderDetail')
router.register(r'orderMaster', OrderMasterViewset, basename='orderMaster')
router.register(r'orderStatus', OrderStatusViewset)
router.register(r'paymentType', PaymentTypeViewset)
router.register(r'user-info', UserInfoViewSet)
router.register(r'expired', ExpiredTokenViewSet)



urlpatterns = [
                  path('login', LoginApiViewSet.as_view(), name='login'),
                  path('user-auth', UserAuthViewSet.as_view(), name='user-auth'),
                  path('logout', LogoutApiViewSet.as_view(), name='logout'),
              ] + router.urls + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
