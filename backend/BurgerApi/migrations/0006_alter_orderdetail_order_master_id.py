# Generated by Django 4.1.1 on 2023-05-19 12:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BurgerApi', '0005_remove_ordermaster_products'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderdetail',
            name='order_master_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_detail', to='BurgerApi.ordermaster'),
        ),
    ]
