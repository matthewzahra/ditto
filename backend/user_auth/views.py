from django.contrib.auth import authenticate, login, logout
from user_auth.models import CustomUser
from user_auth.core.email_service import send_and_save_authentication_code
from user_auth.core.authentication_code import validate_auth_code
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta
from ditto.core.http_handling import api_response, validate, ApiResponseSerializer, disable_endpoint_prod
from drf_spectacular.utils import extend_schema
from .serializers import LoginSerializer, RegisterSerializer, VerifyUserSerializer, RequestPasswordChange, UpdatePasswordSerializer, LoginStatusSerializer, LogoutSerializer
from rest_framework.decorators import api_view
from django.db.utils import IntegrityError
from django.db import transaction

# return if a user is authenticated or not
@extend_schema(request=LoginStatusSerializer, responses=ApiResponseSerializer)
@api_view(['POST','GET'])
def login_status(request):
    if request.user.is_authenticated:
        return api_response(True,data={'loggedIn':True},status=200)
    return api_response(True,data={'loggedIn':False},status=200)


# when we create users, we give them a default password that they must reset with the auth code sent to their email
@extend_schema(request=RegisterSerializer, responses=ApiResponseSerializer)
@api_view(['POST'])
@disable_endpoint_prod
def register(request):  
    data = validate(RegisterSerializer,request.data)

    password = data["password"]
    email = data["email"]
     
    if CustomUser.objects.filter(email=email, verified=True).exists():
        return api_response(False,error="Email Taken",status=400)
    
    # delete all unverified users that are using the same email
    CustomUser.objects.filter(Q(verified=False) & Q(email=email)).delete()
    
    try:
        with transaction.atomic():
            user = CustomUser.objects.create_user(password=password, email=email, verified=False)
            send_and_save_authentication_code(user)

        return api_response(True,status=200)
    except IntegrityError:
        return api_response(False,error="Email Taken",status=400)
    

# verify a user's email for when they login the 1st time, upgrading them from an UnverifiedUser to a CustomUser
@extend_schema(request=VerifyUserSerializer, responses=ApiResponseSerializer)
@api_view(['POST'])
def verify_user(request):  
    data = validate(VerifyUserSerializer,request.data) 

    email = data["email"]
    code = data["code"]

    user = CustomUser.objects.get(email=email, verified=False)

    if user and validate_auth_code(user,code): # verify the user and disable the auth code
        user.verified = True
        user.auth_code_generated_at = timezone.now() - timedelta(days=1)
        user.save()
        return api_response(True, status=200)

    else:
        return api_response(False,error='Invalid authentication code',status=401)

@extend_schema(request=LoginSerializer, responses=ApiResponseSerializer)
@api_view(['POST'])
def login_user(request):
    data = validate(LoginSerializer, request.data)

    email = data["email"]
    password = data["password"]
    
    user = authenticate(request, email=email, password=password)

    if user and user.verified == True:
        login(request, user)
        return api_response(True,status=200)
    else:
        return api_response(False,error="Login credentials are invalid",status=401)

@extend_schema(request=RequestPasswordChange, responses=ApiResponseSerializer)
@api_view(['POST'])
def request_password_change(request):
    data = validate(RequestPasswordChange, request.data)

    email = data["email"]

    user = CustomUser.objects.filter(email=email).first()

    if email and user:
        send_and_save_authentication_code(user)

    return api_response(True,status=200)

@extend_schema(request=UpdatePasswordSerializer, responses=ApiResponseSerializer)
@api_view(['POST'])
def update_password(request): 
    data = validate(UpdatePasswordSerializer, request.data) 

    email = data["email"]
    code = data["code"]
    pass1 = data["pass1"]
    pass2 = data["pass2"]

    user = CustomUser.objects.get(email=email, verified=True)
    if user and validate_auth_code(user,code):
        if pass1 == pass2:
            user.set_password(pass1)
            user.save()
            return api_response(True,status=200)

        else:
            return api_response(False,error="Passwords don't match",status=400)

    else:
        return api_response(False,error="Invalid credentials",status=401)

# TODO find why this doesn't show in api/docs/
@extend_schema(request=LogoutSerializer, responses=ApiResponseSerializer)
@api_view(['POST'])
def logout_user(request):
    logout(request)
    return api_response(True,status=200)