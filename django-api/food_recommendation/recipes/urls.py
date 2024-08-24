from django.urls import path
from .views import get_initial_data, get_recommendations

urlpatterns = [
    path('initial-data/', get_initial_data, name='get_initial_data'),
    path('recommendation/', get_recommendations, name='get_recommendations'),
]
