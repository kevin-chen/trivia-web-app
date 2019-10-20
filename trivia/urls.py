from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='trivia-home'),
    path('search', views.search, name='trivia-search'),
    path('search/<id>', views.search_category, name='trivia-search'),
    path('random', views.random, name='trivia-random'),
]
