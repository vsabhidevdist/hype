# Generated by Django 5.0 on 2023-12-29 09:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_alter_user_bio_alter_user_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='imageUrl',
            field=models.ImageField(max_length=255, upload_to='image'),
        ),
    ]