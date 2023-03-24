# Generated by Django 4.1.1 on 2023-03-21 19:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BurgerApi', '0009_rename_order_master_orderdetail_order_master_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderdetail',
            name='products',
        ),
        migrations.AddField(
            model_name='orderdetail',
            name='product',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='BurgerApi.product'),
            preserve_default=False,
        ),
    ]