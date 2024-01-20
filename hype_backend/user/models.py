from django.utils import timezone
from django.db import models

# Create your models here.
class user(models.Model):
    username = models.CharField(max_length=150)
    email = models.CharField(max_length=150)
    imageUrl = models.ImageField(upload_to='image',max_length=255)
    externalUserId = models.CharField(max_length=150)
    bio = models.CharField(max_length=150,blank=True)
    createdAt = models.DateTimeField(default=timezone.now,blank=True)
    updatedAt = models.DateTimeField(default=timezone.now,blank=True)
