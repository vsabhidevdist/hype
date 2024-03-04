import json
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404, render
from .models import block, follow, user,stream
from rest_framework.response import Response
from rest_framework.decorators import api_view
import datetime
from .serializers import userserializer,followserializer
from django.core import serializers
from django.forms.models import model_to_dict
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q,F
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
    streamname = request.data.get('sname')
    u= user(username=uname,email=uemail,externalUserId=uexternalUserId,imageUrl=uimageUrl)
    u.save()
    s= stream(name=streamname,userId=u)
    s.save()
    return Response({'status': 200})

@api_view(['PUT'])
def userupdate(request):
    put_data = request.data.get('user')
    sname = request.data.get('stream')
    print(sname)
    u = user.objects.filter(externalUserId=put_data.get('externalUserId'))
    u.update(**put_data)
    user_instance = u.first()
    s= stream.objects.filter(userId=user_instance)
    s.update(name=sname.get('name'))
    return Response({'status':200})

@api_view(['PUT'])
def updateBio(request):
    id = request.data.get('externalUserId')
    put_data = request.data.get('user')
   

    u = user.objects.filter(externalUserId=id)
    u.update(**put_data)
    
    
    return Response({'status':200,'obj':put_data})


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
    data = request.data.get('id')
    print(data)
    queryset = user.objects.filter(id=data)
    data_list = []
    for instance in queryset:
        data_dict = model_to_dict(instance)
        
        # Convert ImageFieldFile to string (e.g., image URL)
        data_dict['imageUrl'] = str(data_dict['imageUrl'])
        
        data_list.append(data_dict)
    return JsonResponse(data_list[0], safe=False)
@api_view(['POST'])
def getSelf(request):
    data = request.data.get('externalUserId')
    print(data)
    queryset = user.objects.filter(externalUserId=data)
    data_list = []
    for instance in queryset:
        data_dict = model_to_dict(instance)
        
        # Convert ImageFieldFile to string (e.g., image URL)
        data_dict['imageUrl'] = str(data_dict['imageUrl'])
        
        data_list.append(data_dict)
    return JsonResponse(data_list[0], safe=False)
@api_view(['GET'])
def getUsers(request):
    isUser = request.GET.get('user')
    if(isUser):
        queryset = user.objects.exclude(id=isUser)
        following_ids = follow.objects.filter(follower=isUser).values_list('following', flat=True)
        blocked_ids = block.objects.filter(blockedId=isUser).values_list('blockerId', flat=True)
        
# Exclude the IDs of the user being excluded and the IDs of users being followed
        queryset = user.objects.exclude(id=isUser).exclude(id__in=following_ids).exclude(id__in=blocked_ids)
        queryset = queryset.order_by('createdAt')
        data_list =[]
       
        for instance in queryset:
         
            
           
            data_dict = model_to_dict(instance)
          
            streams = stream.objects.get(userId=data_dict['id'])
           
            # Convert ImageFieldFile to string (e.g., image URL)
            data_dict['imageUrl'] = str(data_dict['imageUrl'])
            data_dict['isLive']=streams.isLive
            data_list.append(data_dict)
        return JsonResponse(data_list, safe=False)

    else:
        queryset = user.objects.all()
        queryset = queryset.order_by('createdAt')
        data_list = []
        for instance in queryset:
            data_dict = model_to_dict(instance)
            streams = stream.objects.get(userId=data_dict['id'])
            # Convert ImageFieldFile to string (e.g., image URL)
            data_dict['imageUrl'] = str(data_dict['imageUrl'])
            data_dict['isLive']=streams.isLive
            data_list.append(data_dict)
        return JsonResponse(data_list, safe=False)
@api_view(['POST'])
def isFollowing(request):
    try:
        follower_id = request.data.get('followerId')
        following_id = request.data.get('followingId')

      

        # Assuming your model is named 'Follow' instead of 'follow'
        queryset = follow.objects.get(follower=follower_id, following=following_id)

        return JsonResponse({"status": True,"followId": queryset.id})
    
    except ObjectDoesNotExist:
        return JsonResponse({"status": False})
    
    except Exception as e:
        # Handle other exceptions, log the error, or return an appropriate response
        print(f"Error: {e}")
        return JsonResponse({"status": False})

@api_view(['POST'])
def getUserByUsername(request):
    username = request.data.get('username')
    queryset = user.objects.filter(username=username)
    data_list = []
    for instance in queryset:
            data_dict = model_to_dict(instance)
            streams = stream.objects.get(userId=data_dict['id'])
            follow_count = follow.objects.filter(following=data_dict['id']).count()
            stream_dict = model_to_dict(streams)
            # Convert ImageFieldFile to string (e.g., image URL)
            data_dict['imageUrl'] = str(data_dict['imageUrl'])
            data_dict['stream']=stream_dict
            data_dict['followerCount']=follow_count
            data_list.append(data_dict)
    return JsonResponse(data_list[0],safe=False)

@api_view(['POST'])
def getUserById(request):
    username = request.data.get('id')
    queryset = user.objects.filter(id=username)
    data_list = []
    for instance in queryset:
            data_dict = model_to_dict(instance)
            streams = stream.objects.get(userId=data_dict['id'])
            stream_dict = model_to_dict(streams)
            # Convert ImageFieldFile to string (e.g., image URL)
            data_dict['imageUrl'] = str(data_dict['imageUrl'])
            data_dict['stream']=stream_dict
            data_list.append(data_dict)
    return JsonResponse(data_list[0],safe=False)

@api_view(['POST'])
def addFollow(request):
    followerId = request.data.get('followerId')
    followingId = request.data.get('followingId')
    follower = user.objects.get(id=followerId)
    following = user.objects.get(id=followingId)


    new_follow = follow.objects.create(follower=follower, following=following)
    new_follow.save()
    updated_follow = follow.objects.get(id=new_follow.id)
    followingdata = user.objects.get(id=updated_follow.following.id)
    return JsonResponse({"status":True,"username": followingdata.username})

@api_view(['DELETE'])
def delFollow(request, resource_id):
    resource = get_object_or_404(follow, id=resource_id)
    followingdata = user.objects.get(id=resource.following.id)
    resource.delete()
    return JsonResponse({'message': f'Resource {resource_id} deleted successfully','username':followingdata.username})

@api_view(['GET'])
def getFollowingUsers(request,resource_id):
    
    blocked_ids = block.objects.filter(blockedId=resource_id).values_list('blockerId', flat=True)
    followings = follow.objects.filter(follower=resource_id).exclude(following__in=blocked_ids)
    data_list = []
    for instance in followings:
            data_dict = model_to_dict(instance)
            streams = stream.objects.get(userId=data_dict['following'])
            followinguser = model_to_dict(instance.following)
            followinguser['imageUrl'] = str(followinguser['imageUrl'])
            data_dict.update({"username":followinguser['username'],"imageUrl":followinguser['imageUrl'],"isLive":streams.isLive})
            
            data_list.append(data_dict)
    return JsonResponse(data_list,safe=False)

@api_view(['POST'])
def isBlocked(request):
    try:
        blockerId = request.data.get('blockerId')
        blockedId = request.data.get('blockedId')

      

        # Assuming your model is named 'Follow' instead of 'follow'
        queryset = block.objects.get(blockerId=blockerId, blockedId=blockedId)

        return JsonResponse({"status": True,"blockId": queryset.id})
    
    except ObjectDoesNotExist:
        return JsonResponse({"status": False})
    
    except Exception as e:
        # Handle other exceptions, log the error, or return an appropriate response
        print(f"Error: {e}")
        return JsonResponse({"status": False})

@api_view(['POST'])
def blockUser(request):
    blockerId = request.data.get('blockerId')
    blockedId = request.data.get('blockedId')
    blocker = user.objects.get(id=blockerId)
    blocked = user.objects.get(id=blockedId)


    new_block = block.objects.create(blockedId=blocked, blockerId=blocker)
    new_block.save()
    updated_block = block.objects.get(id=new_block.id)
 #   blockdata = user.objects.get(id=updated_block.blockedId.id)
    return JsonResponse({"status":True,"username": updated_block.blockedId.username})

@api_view(['DELETE'])
def unblockUser(request, resource_id):
    resource = get_object_or_404(block, id=resource_id)
    
    resource.delete()
    return JsonResponse({'message': f'Resource {resource_id} deleted successfully','username':resource.blockedId.username})



@api_view(['POST'])
def getStreamByUserId(request):
    userId = request.data.get('userId')
    queryset = stream.objects.get(userId=userId)
  
   
    data_dict = model_to_dict(queryset)
          
    return JsonResponse(data_dict,safe=False)

@api_view(['POST'])
def updateStream(request):
    


    put_data = request.data.get('data')
    sid = request.data.get('streamId')
    iid = request.data.get('ingressId')
    if(iid):
        s = stream.objects.filter(ingressId=iid)
        s.update(**put_data)
        return Response({'status': 200})
    s = stream.objects.filter(id=sid)
    s.update(**put_data)
    return Response({'status': 200})


@api_view(['POST'])
def streamAuth(request):
   key = request.data.get("key")
   try:
    s = stream.objects.get(streamKey=key)
    return HttpResponse(f"Stream name: {stream.name}")
   except:
        return HttpResponse("Stream not found", status=404)
   

@api_view(['GET'])
def getStreams(request):
    ordered_rows = stream.objects.all().order_by('isLive', 'updated_at')
    data_list = []
    for instance in ordered_rows:
            data_dict = model_to_dict(instance)
            
            data_list.append(data_dict)
    return JsonResponse(data_list,safe=False)

@api_view(['POST'])
def getStreamsByUser(request):
    userId = request.data.get("userId")
    streams = stream.objects.all().exclude(
    Q(userId__blocking__blockerId=userId) |
    Q(userId__in=block.objects.filter(blockedId=userId).values('blockerId')) | 
    Q(userId=userId) ).annotate(
    imageUrl=F('userId__imageUrl')).values('id','name','thumbnailUrl','isLive','userId__username','userId__imageUrl','userId__bio')
    print(streams)
    data_list = list(streams)

    # Convert imageUrl and thumbnailUrl to string
    for instance in data_list:
        instance['imageUrl'] = str(instance['userId__imageUrl'])
        instance['thumbnailUrl'] = str(instance['thumbnailUrl'])
    
    return JsonResponse(data_list,safe=False)
