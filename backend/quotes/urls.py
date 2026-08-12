from django.urls import path
from . import views

urlpatterns = [
	path("generate_daily_quote/", views.generate_daily_quote, name='generate_daily_quote'),
    path("record_quote/", views.record_quote, name="arecord_quote"),
    path("get_user_quotes/", views.get_user_quotes, name="get_user_quotes"),
    path("delete_quote/", views.delete_quote, name="delete_quote"),
]