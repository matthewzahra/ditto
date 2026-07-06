from django.urls import path

from . import views

urlpatterns = [
	path("status/", views.login_status, name='status'),
    path("login/", views.login_user, name="login"),
    path("register/", views.register, name="register"),
    path("verify_user/", views.verify_user, name="verify_user"),
    path("request_password_change/", views.request_password_change, name="request_password_change"),
    path("update_password/", views.update_password, name="update_password"),
]