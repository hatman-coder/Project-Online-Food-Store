# Generated by Django 4.1.1 on 2023-05-19 12:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BurgerApi', '0006_alter_orderdetail_order_master_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderdetail',
            name='add_ons_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='BurgerApi.addons'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='orderdetail',
            name='add_ons_price',
            field=models.CharField(default=1, max_length=10),
            preserve_default=False,
        ),
    ]
