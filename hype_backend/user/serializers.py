from rest_framework import serializers
from .models import user
from .models import follow
class userserializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields= "__all__"

class followserializer(serializers.ModelSerializer):
    class Meta:
        model=follow
        fields= "__all__"