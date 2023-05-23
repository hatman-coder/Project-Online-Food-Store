# Generated by Django 4.1.1 on 2023-05-22 07:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BurgerApi', '0012_remove_ordermaster_order_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderstatus',
            name='order_master',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_status', to='BurgerApi.ordermaster'),
        ),
    ]
