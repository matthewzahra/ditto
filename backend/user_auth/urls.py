from django.urls import path
from . import views
import os 
from dotenv import load_dotenv

load_dotenv()

ENV = os.getenv("ENV","PROD")

urlpatterns = [
	path("status/", views.login_status, name='status'),
    path("login/", views.login_user, name="login"),
    path("verify_user/", views.verify_user, name="verify_user"),
    path("request_password_change/", views.request_password_change, name="request_password_change"),
    path("update_password/", views.update_password, name="update_password"),
	path("logout/", views.logout_user, name="logout"),
	path("<int:user_id>/profile-picture/", views.get_profile_picture, name="profile-picture"),
	path("get_users/", views.get_users, name='get_users'),
	path("update_profile_picture/", views.update_profile_picture, name="update_profile_picture"),
	path("delete_profile_picture/", views.delete_profile_picture, name="delete_profile_pciture")
]

# endpoints only intended for DEV work
if ENV == "DEV":
	urlpatterns += [path("register/", views.register, name="register")]