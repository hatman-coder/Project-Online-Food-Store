# Generated by Django 4.1.1 on 2023-05-19 12:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BurgerApi', '0007_orderdetail_add_ons_id_orderdetail_add_ons_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderdetail',
            name='add_ons_id',
        ),
        migrations.AddField(
            model_name='orderdetail',
            name='add_ons',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='add_ons_list', to='BurgerApi.addons'),
            preserve_default=False,
        ),
    ]
