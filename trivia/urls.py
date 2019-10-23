from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='trivia-home'),
    path('search/', views.search, name='trivia-search'),
    path('search/<text>', views.search, name='trivia-search'),
    path('category/<id>', views.category_trivia, name='trivia-category'),
    path('random', views.random, name='trivia-random'),
]
