from django.contrib.auth import logout, authenticate
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
import json
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt


@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})


@csrf_exempt  # Отключаем CSRF для маршрута логина
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return JsonResponse({'error': 'Username and password required'}, status=400)
        if CustomUser.objects.filter(username=username).exists():
            return JsonResponse({'error': 'User already exists'}, status=400)
        CustomUser.objects.create_user(username=username, password=password)
        return JsonResponse({'message': 'User registered successfully'}, status=201)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt  # Отключаем CSRF для логина
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'error': 'Username and password required'}, status=400)

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'message': 'Login successful',
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            })
        return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def user_logout(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})



