from django.contrib import admin
from BurgerApi.models import *


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'in_stock')


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category', 'id')


class OrderMasterAdmin(admin.ModelAdmin):
    list_display = ('order_no', 'order_time')


class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ('order_master_id',)

class UserTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'token', 'created_at')

class ExpiredTokenAdmin(admin.ModelAdmin):
    list_display = ('token', 'created_at')

admin.site.register(UserProfile)
admin.site.register(CustomerDetail)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(OrderDetail, OrderDetailAdmin)
admin.site.register(OrderMaster, OrderMasterAdmin)
admin.site.register(UserInfo)
admin.site.register(UserToken, UserTokenAdmin)
admin.site.register(ExpiredToken, ExpiredTokenAdmin)
admin.site.register(AddOns)
admin.site.register(PaymentType)
admin.site.register(OrderStatus)
