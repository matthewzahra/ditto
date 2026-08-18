from django.urls import path
from . import views

urlpatterns = [
	path("record_restaurant/", views.record_restaurant, name='record_restaurant'),
	path("delete_restaurant/", views.delete_restaurant, name='delete_restaurant'),
	path("get_user_restaurants/", views.get_user_restaurants, name='get_user_restaurants'),
]