# Generated by Django 5.1.2 on 2024-11-14 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='group',
            field=models.CharField(choices=[('steel', 'Стальные люки'), ('aluminum', 'Алюминиевые люки')], default='steel', max_length=50),
        ),
    ]
