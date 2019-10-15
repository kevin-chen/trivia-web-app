from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='trivia-home'),
    path('about/', views.about, name='trivia-about'),
]
