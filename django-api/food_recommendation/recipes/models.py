from django.db import models

class Cuisine(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Vegetable(models.Model):
    name = models.CharField(max_length=100)
    cuisine = models.ForeignKey(Cuisine, related_name='vegetables', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class TasteProfile(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Dish(models.Model):
    name = models.CharField(max_length=100)
    cuisine = models.ForeignKey(Cuisine, related_name='dishes', on_delete=models.CASCADE)
    vegetables = models.ManyToManyField(Vegetable)
    taste_profiles = models.ManyToManyField(TasteProfile)

    def __str__(self):
        return self.name
