import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import user
from rest_framework.response import Response
from rest_framework.decorators import api_view
import datetime
from .serializers import userserializer
# Create your views here.
@api_view(['POST'])
def userinfo(request):
   
    print(request.POST)
    now = datetime.datetime.now()
    # data = userserializer(request.POST,many=True)
    
    uname=request.data.get('username')
    uemail = request.data.get('email')
    uexternalUserId = request.data.get('externalUserId')
    uimageUrl = request.data.get('imageUrl')
    u= user(username=uname,email=uemail,externalUserId=uexternalUserId,imageUrl=uimageUrl)
    u.save()
    return Response({'status': 200})

@api_view(['PUT'])
def userupdate(request):
    put_data = request.data
    u = user.objects.filter(externalUserId=put_data.get('externalUserId'))
    u.update(**put_data)
    return Response({'status':200})
@api_view(['DELETE'])
def userdelete(request):
    data = request.data
    u = user.objects.filter(externalUserId=data.get('externalUserId'))
    print(u)
    u.delete()
    return Response({'status':200})
def home(request):
    return HttpResponse("Home")
@api_view(['POST'])
def getUser(request):
    data = request.data.get('externalUserId')
    print(data)
    u = user.objects.filter(externalUserId=data)
    print(u)
    return JsonResponse({'data':'user'})