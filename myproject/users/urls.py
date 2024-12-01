
from .views import register, user_login, user_logout
from django.urls import path
from .views import csrf_token_view

urlpatterns = [
    path('csrf/', csrf_token_view, name='csrf_token_view'),
    path('register/', register, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
]






