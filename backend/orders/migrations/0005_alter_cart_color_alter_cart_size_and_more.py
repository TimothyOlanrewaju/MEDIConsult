# Generated by Django 5.0.4 on 2024-08-20 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_rename_mode_deliverymode_cart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='color',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='cart',
            name='size',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
