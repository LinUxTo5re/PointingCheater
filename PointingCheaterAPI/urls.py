from django.urls import path
from . import views

urlpatterns = [
        path('api/getvotes/', views.fetch_votes, name='voting_data'),
        path('api/postfeedback/', views.create_feedback, name='create_feedback'),
]