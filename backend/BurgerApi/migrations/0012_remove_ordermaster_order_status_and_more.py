# Generated by Django 4.1.1 on 2023-05-22 07:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BurgerApi', '0011_orderdetail_total_add_ons_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordermaster',
            name='order_status',
        ),
        migrations.AddField(
            model_name='orderstatus',
            name='order_master',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='BurgerApi.ordermaster'),
            preserve_default=False,
        ),
    ]
