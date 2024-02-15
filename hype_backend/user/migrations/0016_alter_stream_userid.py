# Generated by Django 5.0 on 2024-02-11 15:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0015_alter_stream_userid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stream',
            name='userId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='streamBy', to='user.user', unique=True),
        ),
    ]