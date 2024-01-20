from rest_framework import serializers
from user.models import user
class userserializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields= "__all__"