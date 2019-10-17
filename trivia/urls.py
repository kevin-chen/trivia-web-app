from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='trivia-home'),
    path('category', views.get_name, name='trivia-category'),
    path('random', views.random, name='trivia-random'),
]
