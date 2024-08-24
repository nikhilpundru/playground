from django.core.management.base import BaseCommand
from recipes.models import Cuisine, Vegetable, TasteProfile, Dish

class Command(BaseCommand):
    help = 'Load initial data into the database'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Cuisine.objects.all().delete()
        Vegetable.objects.all().delete()
        TasteProfile.objects.all().delete()
        Dish.objects.all().delete()

        # Load cuisines
        cuisines = [
            {"name": "Indian"},
            {"name": "Italian"},
            {"name": "Chinese"},
            {"name": "Mexican"},
            {"name": "Japanese"},
            {"name": "Thai"}
        ]
        for cuisine in cuisines:
            Cuisine.objects.create(**cuisine)

        # Load vegetables
        vegetables = [
            {"name": "Potato", "cuisine": Cuisine.objects.get(name="Indian")},
            {"name": "Tomato", "cuisine": Cuisine.objects.get(name="Indian")},
            {"name": "Spinach", "cuisine": Cuisine.objects.get(name="Indian")},
            {"name": "Garlic", "cuisine": Cuisine.objects.get(name="Italian")},
            {"name": "Onion", "cuisine": Cuisine.objects.get(name="Italian")},
            {"name": "Bell Pepper", "cuisine": Cuisine.objects.get(name="Italian")},
            {"name": "Bok Choy", "cuisine": Cuisine.objects.get(name="Chinese")},
            {"name": "Bean Sprouts", "cuisine": Cuisine.objects.get(name="Chinese")},
            {"name": "Corn", "cuisine": Cuisine.objects.get(name="Mexican")},
            {"name": "Avocado", "cuisine": Cuisine.objects.get(name="Mexican")},
            {"name": "Seaweed", "cuisine": Cuisine.objects.get(name="Japanese")},
            {"name": "Edamame", "cuisine": Cuisine.objects.get(name="Japanese")},
            {"name": "Kaffir Lime Leaves", "cuisine": Cuisine.objects.get(name="Thai")},
            {"name": "Thai Eggplant", "cuisine": Cuisine.objects.get(name="Thai")}
        ]
        for vegetable in vegetables:
            Vegetable.objects.create(**vegetable)

        # Load taste profiles
        taste_profiles = [
            {"name": "Sweet"},
            {"name": "Spicy"},
            {"name": "Sour"},
            {"name": "Savory"},
            {"name": "Bitter"}
        ]
        for taste_profile in taste_profiles:
            TasteProfile.objects.create(**taste_profile)

        # Load dishes
        dishes = [
            {
                "name": "Paneer Butter Masala",
                "cuisine": Cuisine.objects.get(name="Indian"),
                "vegetables": Vegetable.objects.filter(name="Potato"),
                "taste_profiles": TasteProfile.objects.filter(name__in=["Spicy", "Savory"])
            },
            {
                "name": "Chole Bhature",
                "cuisine": Cuisine.objects.get(name="Indian"),
                "vegetables": Vegetable.objects.filter(name__in=["Potato", "Tomato"]),
                "taste_profiles": TasteProfile.objects.filter(name__in=["Sweet", "Spicy"])
            },
            {
                "name": "Spaghetti Carbonara",
                "cuisine": Cuisine.objects.get(name="Italian"),
                "vegetables": Vegetable.objects.filter(name__in=["Garlic", "Bell Pepper"]),
                "taste_profiles": TasteProfile.objects.filter(name="Savory")
            },
            {
                "name": "Kung Pao Chicken",
                "cuisine": Cuisine.objects.get(name="Chinese"),
                "vegetables": Vegetable.objects.filter(name__in=["Bok Choy", "Bean Sprouts"]),
                "taste_profiles": TasteProfile.objects.filter(name="Spicy")
            },
            {
                "name": "Tacos",
                "cuisine": Cuisine.objects.get(name="Mexican"),
                "vegetables": Vegetable.objects.filter(name__in=["Corn", "Avocado"]),
                "taste_profiles": TasteProfile.objects.filter(name__in=["Spicy", "Savory"])
            },
            {
                "name": "Sushi",
                "cuisine": Cuisine.objects.get(name="Japanese"),
                "vegetables": Vegetable.objects.filter(name__in=["Seaweed", "Edamame"]),
                "taste_profiles": TasteProfile.objects.filter(name__in=["Sweet", "Savory"])
            },
            {
                "name": "Pad Thai",
                "cuisine": Cuisine.objects.get(name="Thai"),
                "vegetables": Vegetable.objects.filter(name__in=["Kaffir Lime Leaves", "Thai Eggplant"]),
                "taste_profiles": TasteProfile.objects.filter(name__in=["Spicy", "Sour"])
            }
        ]
        for dish in dishes:
            dish_instance = Dish.objects.create(
                name=dish["name"],
                cuisine=dish["cuisine"]
            )
            dish_instance.vegetables.set(dish["vegetables"])
            dish_instance.taste_profiles.set(dish["taste_profiles"])

        self.stdout.write(self.style.SUCCESS('Successfully loaded initial data'))
