from django.utils import timezone
from django.db import models
from django.contrib.postgres.search import SearchVectorField, SearchVector

# Create your models here.

class user(models.Model):
    username = models.CharField(max_length=150)
    email = models.CharField(max_length=150)
    imageUrl = models.ImageField(upload_to='image',max_length=255)
    externalUserId = models.CharField(max_length=150)
    bio = models.CharField(max_length=150,blank=True)
    createdAt = models.DateTimeField(default=timezone.now,blank=True)
    updatedAt = models.DateTimeField(default=timezone.now,blank=True)

class follow(models.Model):
     
     follower = models.ForeignKey(user, on_delete=models.CASCADE, related_name='followedBy')
     following = models.ForeignKey(user, on_delete=models.CASCADE, related_name='following')
     created_at = models.DateTimeField(auto_now_add=True)
     updated_at = models.DateTimeField(auto_now=True)
     class Meta:
        unique_together = ('follower', 'following')

class block(models.Model):
     
     blockerId = models.ForeignKey(user, on_delete=models.CASCADE, related_name='blockedBy')
     blockedId = models.ForeignKey(user, on_delete=models.CASCADE, related_name='blocking')
     class Meta:
        unique_together = ('blockerId', 'blockedId')


class stream(models.Model):
    name = models.CharField(max_length=150,db_index=True)

    name_search_vector = SearchVectorField(null=True, editable=False)

    thumbnailUrl = models.CharField(max_length=255,blank=True, null=True)
    ingressId = models.CharField(max_length=255,unique=True,db_index=True,blank=True, null=True)
    serverUrl = models.CharField(max_length=255,blank=True, null=True)
    streamKey = models.CharField(max_length=255,blank=True, null=True)
    isLive = models.BooleanField(default=False)
    isChatEnabled = models.BooleanField(default=True)
    isChatDelayed = models.BooleanField(default=False)
    isChatFollowersOnly = models.BooleanField(default=False)

    userId = models.ForeignKey(user, on_delete=models.CASCADE,unique=True,related_name='streamBy')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

