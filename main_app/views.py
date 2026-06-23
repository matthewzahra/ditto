from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from .models import CustomUser


def index(request):
    return render(request, 'home.html')

def register(request):
    if request.method == "GET":
        return render(request, "register.html")

    if request.method != "POST":
        return HttpResponse("User registration requires a POST request.")
    
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')

    if not all([username,password,email]):
        return HttpResponse("Missing user information")
    
    if CustomUser.objects.filter(username=username).exists():
        return HttpResponse("Username taken.")

    # TODO - implement some email authentication 
    
    user = CustomUser.objects.create_user(username=username, password=password, email=email)

    return HttpResponse("User succesfully created.")

def login_user(request):
    if request.method == "GET":
        return render(request, "login.html")
    
    if request.method != "POST":
        return HttpResponse("Login requires a POST request.")
    
    username = request.POST.get("username")
    password = request.POST.get("password")

    if not username or not password:
        return HttpResponse("Missing information")
    
    user = authenticate(request, username=username, password=password)

    if user:
        login(request, user)
        return HttpResponse("User successfully logged in")
    else:
        return HttpResponse("Login credentials are invalid")