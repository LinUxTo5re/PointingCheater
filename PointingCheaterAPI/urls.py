from django.urls import path
from . import views

urlpatterns = [
        path('api/getvotes/', views.fetch_votes, name='voting_data'),
]