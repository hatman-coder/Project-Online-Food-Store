# Generated by Django 4.1.1 on 2023-05-19 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BurgerApi', '0009_remove_orderdetail_add_ons_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderdetail',
            name='add_ons',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
