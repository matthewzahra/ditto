from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from main_app.models import CustomUser
from django.contrib import messages


def index(request):
    return render(request, 'home.html')

def register(request):
    if request.method == "GET":
        return render(request, "register.html")

    if request.method != "POST":
        messages.error(request, "User registration requires a POST request.")
        return render(request, 'register.html')
    
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')

    if not all([username,password,email]):
        messages.error(request, "Missing user information")
        return render(request, 'register.html')
    
    if CustomUser.objects.filter(username=username).exists():
        messages.error(request, "Username taken.")
        return render(request, 'register.html')

    # TODO - implement some email authentication 
    
    user = CustomUser.objects.create_user(username=username, password=password, email=email)

    return redirect('index')

def login_user(request):
    if request.method == "GET":
        return render(request, "login.html")
    
    if request.method != "POST":
        messages.error(request, "Login requires a POST request.")
        return render(request, "login.html")
    
    username = request.POST.get("username")
    password = request.POST.get("password")

    if not username or not password:
        messages.error(request, "Missing information.")
        return render(request, "login.html")
    
    user = authenticate(request, username=username, password=password)

    if user:
        login(request, user)
        return redirect('index')
    else:
        messages.error(request, "Login credentials are invalid")
        return render(request, "login.html")
    
def logout_user(request):
    raise NotImplemented