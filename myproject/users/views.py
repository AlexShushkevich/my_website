from django.contrib.auth import logout, authenticate
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, UserProfile
from .serializers import UserProfileSerializer
import json
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt


@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'error': 'Требуется имя пользователя и пароль'}, status=400)

        if CustomUser.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Пользователь уже существует'}, status=400)

        user = CustomUser.objects.create_user(username=username, password=password)


        return JsonResponse({'message': 'Пользователь успешно зарегистрировался'}, status=201)

    return JsonResponse({'error': 'Недопустимый метод запроса'}, status=405)


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'error': 'Требуется имя пользователя и пароль'}, status=400)

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'message': 'Login successful',
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            })

        return JsonResponse({'error': 'Неверные учетные данные'}, status=400)

    return JsonResponse({'error': 'Недопустимый метод запроса'}, status=405)


def user_logout(request):
    logout(request)
    return JsonResponse({'message': 'Успешно вышел из системы'})


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response({'error': 'Профиль не найден'}, status=404)

        # Serialize the profile data
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
       
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            profile = UserProfile.objects.create(user=request.user)

        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)
