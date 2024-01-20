
from . import views
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
 
     path("",views.home,name="home"),
    path("userinfo",views.userinfo,name="userinfo"),
    path("userupdate",views.userupdate,name="userupdate"),
    path('userdelete',views.userdelete,name="userdelete"),
    path('getuser',views.getUser,name="getuser")
]
