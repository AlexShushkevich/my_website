from django.db import models

class Product(models.Model):
    GROUP_CHOICES = [
        ('steel', 'Стальные люки'),
        ('aluminum', 'Алюминиевые люки'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    group = models.CharField(max_length=50, choices=GROUP_CHOICES, default='steel')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name