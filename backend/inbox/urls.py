from django.urls import path
from . import views

urlpatterns = [
	path("get_messages/", views.get_messages, name='get_messages'),
	path("unread_count/", views.unread_count, name='unread_count'),
	path("delete_message/", views.delete_message, name='delete_message'),
	path("read_message/", views.read_message, name='read_message'),
	path("execute_action/", views.execute_action, name='execute_action'),
]