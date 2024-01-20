from django.http import HttpResponse
from django.shortcuts import render
from .models import Dataclass
# Create your views here.
def home(request):
    return render(request, 'home.html',{'name':'1'})
def add(request):
    v1=int(request.POST['num1'])
    v2=int(request.POST['num2'])
    r=v1+v2

    return render(request, 'result.html',{'result':r})
def data(request):
    data= Dataclass.objects.filter(id=1)  
    data1=data[0]
    print(data1.name)
    return render(request,'home.html',{'data':data })