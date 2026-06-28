from django.contrib.auth import authenticate, login, logout
from main_app.models import CustomUser
from django.contrib import messages
from main_app.core.email_service import send_and_save_authentication_code
from main_app.core.authentication_code import validate_auth_code
from django.db.models import Q
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from datetime import timedelta
from ditto.core.http_handling import api_response
import json

# when we create users, we give them a default password that they must reset with the auth code sent to their email
@require_http_methods(['POST'])
def register(request):  
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')

    if not all([username,password,email]):
        return api_response(False,error="Missing user information",status=400)
    
    if CustomUser.objects.filter(username=username, verified=True).exists():
        return api_response(False,error="Username taken",status=400)
    
    if CustomUser.objects.filter(email=email, verified=True).exists():
        return api_response(False,error="Email Taken",status=400)
    
    # delete all unverified users that are using the same username/email
    CustomUser.objects.filter(Q(verified=False) & (Q(username=username) | Q(email=email))).delete()
    
    user = CustomUser.objects.create_user(username=username, password=password, email=email, verified=False)
    
    send_and_save_authentication_code(user)

    return api_response(True,status=200)

# verify a user's email for when they login the 1st time, upgrading them from an UnverifiedUser to a CustomUser
@require_http_methods(['POST'])
def verify_user(request):   
    email = request.POST.get('email')
    code = request.POST.get('code')
    user = CustomUser.objects.filter(email=email, verified=False)

    if user and validate_auth_code(user,code): # verify the user and disable the auth code
        user.verified = True
        user.auth_code_generated_at = timezone.now() - timedelta(days=1)
        user.save()
        return api_response(True, status=200)

    else:
        return api_response(False,error='Invalid authentication code',status=401)
        messages.error(request, 'Invalid authentication code.')

@require_http_methods(['POST'])
def login_user(request):
    data = json.loads(request.body)
    print(data)
    #username = request.POST.get("username")
    #password = request.POST.get("password")
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return api_response(False,error='Missing information',status=400)
    
    user = authenticate(request, username=username, password=password)

    if user:
        login(request, user)
        return api_response(True,status=200)
    else:
        return api_response(False,error="Login credentials are invalid",status=401)

@require_http_methods(['POST'])
def request_password_change(request):
    email = request.POST.get('email')

    if email and (user := CustomUser.objects.filter(email=email)):
        send_and_save_authentication_code(user)

    return api_response(True,status=200)

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
            return api_response(True,status=200)

        else:
            return api_response(False,error="Passwords don't match",status=400)

    else:
        return api_response(False,error="Invalid credentials",status=401)

def logout_user(request):
    logout(request)
    return api_response(True,status=200)