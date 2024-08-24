from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Dish, Cuisine, Vegetable, TasteProfile
from .serializers import DishSerializer, CuisineSerializer, VegetableSerializer, TasteProfileSerializer

@api_view(['GET'])
def get_initial_data(request):
    cuisines = Cuisine.objects.all()
    vegetables = Vegetable.objects.all()
    taste_profiles = TasteProfile.objects.all()

    cuisine_serializer = CuisineSerializer(cuisines, many=True)
    vegetable_serializer = VegetableSerializer(vegetables, many=True)
    taste_profile_serializer = TasteProfileSerializer(taste_profiles, many=True)

    return Response({
        'cuisines': cuisine_serializer.data,
        'vegetables': vegetable_serializer.data,
        'taste_profiles': taste_profile_serializer.data
    })

@api_view(['POST'])
def get_recommendations(request):
    cuisines = request.data.get('cuisines', [])
    vegetables = request.data.get('vegetables', [])
    taste_profiles = request.data.get('taste_profiles', [])

    if not (isinstance(cuisines, list) and isinstance(vegetables, list) and isinstance(taste_profiles, list)):
        return Response({'error': 'Invalid data format'}, status=400)

    dishes = Dish.objects.filter(
        cuisine__in=cuisines,
        vegetables__in=vegetables,
        taste_profiles__in=taste_profiles
    ).distinct()

    serializer = DishSerializer(dishes, many=True)
    return Response({'recommendations': serializer.data})
