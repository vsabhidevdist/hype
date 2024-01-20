from django.http import HttpResponse
from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
# Create your views here.
def register(request):
    if request.method == 'POST':
        fname= request.POST['fname']
        lname= request.POST['lname']
        uname= request.POST['uname']
        email= request.POST['email']
        pass1= request.POST['pass']
        pass2= request.POST['pass1']
        if pass1==pass2:
            if User.objects.filter(username=uname).exists():
                return HttpResponse("User already exist")
            else:
                user = User.objects.create_user(first_name=fname,last_name=lname,username=uname,password=pass1,email=email)
                user.save()
                print("User created")
                return HttpResponse('Created')
        else:
           return HttpResponse("Password not matching")
    else:
        return render(request,'register.html')
def login(request):
    if request.method=="POST":
        uname= request.POST['uname']
      
        password= request.POST['pass']
        user = auth.authenticate(username=uname,password=password)
        if user is not None:
            auth.login(request,user)
            return render(request,'homepage.html')
    else:
        return render(request,'login.html')
def logout(request):
    auth.logout(request)
    return redirect('login')