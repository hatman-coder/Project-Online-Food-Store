# Generated by Django 4.1.1 on 2023-05-22 09:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BurgerApi', '0019_remove_customerdetail_user_customerdetail_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customerdetail',
            old_name='user_id',
            new_name='user',
        ),
    ]