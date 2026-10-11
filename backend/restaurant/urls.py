from django.urls import path
from . import views

urlpatterns = [
	path("record_restaurant/", views.record_restaurant, name='record_restaurant'),
	path("delete_restaurant/", views.delete_restaurant, name='delete_restaurant'),
	path("get_user_restaurants/", views.get_user_restaurants, name='get_user_restaurants'),
    path("favourite_restaurant/", views.favourite_restaurant, name='favourite_restaurant'),
    path("unfavourite_restaurant/", views.unfavourite_restaurant, name='unfavourite_restaurant'),
    path("visit_restaurant/", views.visit_restaurant, name='visit_restaurant'),
    path("unvisit_restaurant/", views.unvisit_restaurant, name='unvisit_restaurant')
]