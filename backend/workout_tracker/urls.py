from django.urls import path
from . import views

urlpatterns = [
    path("add_exercise/", views.add_exercise, name="add_exercise"),
    path("delete_exercise/", views.delete_exercise, name="delete_exercise"),
    path("get_exercises/", views.get_exercises, name="get_exercises"),
    path("get_workouts/", views.get_workouts, name="get_workouts"),
    path("add_workout/", views.add_workout, name="add_workout"),
    path("delete_workout/", views.delete_workout, name="delete_workout"),
    path("get_cardio/", views.get_cardio, name="get_cardio"),
    path("add_cardio/", views.add_cardio, name="add_cardio"),
    path("delete_cardio/", views.delete_cardio, name="delete_cardio"),
]