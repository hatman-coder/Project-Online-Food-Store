import string
import random
from django.db import models
from django.db.models import ForeignKey
from multiselectfield import MultiSelectField
from django.contrib.auth.models import (AbstractBaseUser,
                                        BaseUserManager,
                                        PermissionsMixin)
from rest_framework.permissions import AllowAny


def upload_product_image(instance, filename):
    return "uploads/{category}/{name}/{filename}".format(category=instance.category, name=instance.name,
                                                         filename=filename)


# https://stackoverflow.com/questions/36177385/visualizing-uploaded-images-in-django-admin


def random_string(size=10, chars=string.ascii_lowercase + string.digits):
    data = ''.join(random.choice(chars) for _ in range(size))
    return data


class UserProfileManager(BaseUserManager):
    def create_user(self, email, phone, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have email')
        email = self.normalize_email(email)
        user = self.model(email=email, phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, email, phone, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('username', 'admin')
        return self.create_user(email, phone, password, **extra_fields)


class UserProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone']

    def __str__(self):
        return self.email


class UserToken(models.Model):
    user = models.CharField(max_length=200)
    token = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token


class ExpiredToken(models.Model):
    token = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token


class UserInfo(models.Model):
    profile_image = models.ImageField(null=True, blank=True)
    current_city = models.CharField(max_length=50, blank=True)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.user


class PaymentType(models.Model):
    payment_type = models.CharField(max_length=100)

    def __str__(self):
        return self.payment_type


class Category(models.Model):
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.category


class Product(models.Model):
    img = models.ImageField(upload_to=upload_product_image, null=True, blank=True)
    name = models.CharField(max_length=200)
    price = models.CharField(max_length=600)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True)
    in_stock = models.IntegerField(default=0)

    def __str__(self):
        return str(self.name)


class AddOns(models.Model):
    add_ons = models.CharField(max_length=100)
    add_ons_price = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.add_ons









class OrderMaster(models.Model):
    order_no = models.CharField(max_length=10,
                                blank=True,
                                editable=False,
                                unique=True,
                                default=random_string)
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    payment_type = models.ForeignKey(PaymentType, on_delete=models.CASCADE)
    total = models.CharField(max_length=100, null=True, blank=True)
    order_time = models.DateTimeField(auto_now_add=True)
    delivery_time = models.CharField(max_length=1000, editable=False)

    def __str__(self):
        return str(self.order_no)

class CustomerDetail(models.Model):
    delivery_address = models.TextField(max_length=200, blank=True)
    city = models.CharField(max_length=50, blank=True)
    post_code = models.CharField(max_length=10, blank=True)
    house_no = models.CharField(max_length=20, blank=True)
    contact_number = models.CharField(max_length=13, blank=True)
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    order_master_id = models.ForeignKey(OrderMaster, on_delete=models.CASCADE, related_name='customer_detail')


    def __str__(self):
        return str(self.order_master_id)

class OrderStatus(models.Model):
    order_placed = models.CharField(max_length=100, blank=True, null=True)
    order_pending = models.CharField(max_length=100, blank=True, null=True)
    order_confirmed = models.CharField(max_length=100, blank=True, null=True)
    order_preparation_on_going = models.CharField(max_length=100, blank=True, null=True)
    out_for_delivery = models.CharField(max_length=100, blank=True, null=True)
    delivered = models.CharField(max_length=100, blank=True, null=True)
    order_master_id = models.ForeignKey(OrderMaster, on_delete=models.CASCADE, related_name='order_status')

    def __str__(self):
        return str(self.order_master_id)

class OrderDetail(models.Model):
    order_master_id = models.ForeignKey(OrderMaster, on_delete=models.CASCADE, related_name='order_detail')
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_price = models.CharField(max_length=10)
    add_ons = models.CharField(max_length=200, blank=True, null=True)
    total_add_ons_price = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return str(self.order_master_id.order_no)

    