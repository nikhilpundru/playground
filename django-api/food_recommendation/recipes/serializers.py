from rest_framework import serializers
from .models import Dish, Cuisine, Vegetable, TasteProfile

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['id', 'name']

class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = ['id', 'name']

class VegetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vegetable
        fields = ['id', 'name']

class TasteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TasteProfile
        fields = ['id', 'name']
