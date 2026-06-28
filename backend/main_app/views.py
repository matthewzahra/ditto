from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from main_app.models import CustomUser
from django.contrib import messages
from main_app.core.email_service import send_and_save_authentication_code
from main_app.core.authentication_code import validate_auth_code
from django.db.models import Q
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from datetime import timedelta


def index(request):
    return render(request, 'home.html')


# when we create users, we give them a default password that they must reset with the auth code sent to their email
@require_http_methods(['GET','POST'])
def register(request):
    if request.method == "GET":
        return render(request, "register.html")
    
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')

    if not all([username,password,email]):
        messages.error(request, "Missing user information")
        return render(request, 'register.html')
    
    if CustomUser.objects.filter(username=username, verified=True).exists():
        messages.error(request, "Username taken.")
        return render(request, 'register.html')
    
    if CustomUser.objects.filter(email=email, verified=True).exists():
        messages.error(request, "Email taken.")
        return render(request, 'register.html')
    
    # delete all unverified users that are using the same username/email
    CustomUser.objects.filter(Q(verified=False) & (Q(username=username) | Q(email=email))).delete()
    
    user = CustomUser.objects.create_user(username=username, password=password, email=email, verified=False)
    
    send_and_save_authentication_code(user)

    return redirect('register')

# verify a user's email for when they login the 1st time, upgrading them from an UnverifiedUser to a CustomUser
@require_http_methods(['GET','POST'])
def verify_user(request):
    if request.method == "GET":
        return render(request, 'register.html')
    
    email = request.POST.get('email')
    code = request.POST.get('code')
    user = CustomUser.objects.filter(email=email, verified=False)

    if user and validate_auth_code(user,code): # verify the user and disable the auth code
        user.verified = True
        user.auth_code_generated_at = timezone.now() - timedelta(days=1)
        user.save()
        return redirect('index')

    else:
        messages.error(request, 'Invalid authentication code.')
        return render(request, 'register.html')

@require_http_methods(['GET','POST'])
def login_user(request):
    if request.method == "GET":
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

@require_http_methods(['POST'])
def request_password_change(request):
    email = request.POST.get('email')

    if email and (user := CustomUser.objects.filter(email=email)):
        send_and_save_authentication_code(user)

    return redirect('login')

@require_http_methods(['POST'])
def update_password(request):  
    email = request.POST.get('email')
    code = request.POST.get('code')
    pass1 = request.POST.get('pass1')
    pass2 = request.POST.get('pass2')

    user = CustomUser.objects.filter(email=email, verified=True)
    if user and validate_auth_code(user,code):
        if pass1 == pass2:
            user.set_password(pass1)
            user.save()
            return redirect(request, 'login.html')
        else:
            messages.error(request, "Passwords don't match.")
            return render(request, 'login.html')

    else:
        messages.error(request, "Invalid credentials.")
        return render(request, 'login.html')

def logout_user(request):
    raise NotImplemented