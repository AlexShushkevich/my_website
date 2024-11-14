from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    pass  # позволяет создать собственную модель пользователя, которую можно расширить при необходимости. Если вы хотите добавить дополнительные поля в модель пользователя, их можно определить в этом классе