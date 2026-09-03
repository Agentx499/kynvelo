from django.db import models
from core.models import TenantBaseModel

class FoodItem(TenantBaseModel):
    name = models.CharField(max_length=255)
    barcode = models.CharField(max_length=64, null=True, blank=True, db_index=True)
    serving_size_grams = models.DecimalField(max_digits=6, decimal_places=2, default=100.0)
    calories = models.PositiveIntegerField()
    protein_grams = models.DecimalField(max_digits=6, decimal_places=2)
    carbs_grams = models.DecimalField(max_digits=6, decimal_places=2)
    fat_grams = models.DecimalField(max_digits=6, decimal_places=2)
    is_usda_verified = models.BooleanField(default=True)


class MealLog(TenantBaseModel):
    MEAL_TYPES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
        ('snack', 'Snack'),
    ]

    member_id = models.CharField(max_length=64, db_index=True)
    meal_type = models.CharField(max_length=16, choices=MEAL_TYPES)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    servings = models.DecimalField(max_digits=4, decimal_places=2, default=1.0)
    logged_date = models.DateField(db_index=True)


class AIPhotoRecognitionJob(TenantBaseModel):
    member_id = models.CharField(max_length=64)
    image_url = models.URLField()
    stage_1_vision_output = models.JSONField(help_text="Detected food labels from multimodal model")
    stage_2_verified_macros = models.JSONField(help_text="Matched macros against USDA FoodData API")
    confidence_score = models.DecimalField(max_digits=4, decimal_places=3, default=0.95)
    user_confirmed = models.BooleanField(default=False)
