
from . import views
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
 
    
    path("userinfo",views.userinfo,name="userinfo"),
    path("userupdate",views.userupdate,name="userupdate"),
    path('userdelete',views.userdelete,name="userdelete"),
    path('getuser',views.getUser,name="getuser"),
    path('getusers',views.getUsers,name="getusers"),
    path('getself',views.getSelf,name="getself"),
    path('getuserbyid',views.getUserById,name="getuserbyid"),


    path('isfollowing',views.isFollowing,name="isfollowing"),
    path('getuserbyusername',views.getUserByUsername,name="getuserbyusername"),
    path('addfollow',views.addFollow,name="addfollow"),
    path('delfollow/<int:resource_id>/',views.delFollow,name="delfollow"),
    path('getfollowingusers/<int:resource_id>/',views.getFollowingUsers,name="getfollowingusers"),

    path('isblocked',views.isBlocked,name="isblocked"),
    path('blockuser',views.blockUser,name="blockuser"),
    path('unblockuser/<int:resource_id>/',views.unblockUser,name="unblockuser"),

    path('getstreambyuserid',views.getStreamByUserId,name="getstreambyuserid"),
    path('updatestream',views.updateStream,name="updatestream"),
]
