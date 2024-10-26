from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import os
import requests
from rest_framework import status
from .serializers import FeedbackSerializer

"""
This endpoint will fetch pointing poker data through
it's api and filter according the need
"""
@api_view(['GET'])
def fetch_votes(request):
    api_key = os.getenv('PP_API_KEY')

    try:
        response = requests.get(api_key)
        if response.status_code == 200:
            data = response.json()
            player_list_with_votes = data.get('Players', False)
            player_and_votes_list = [] 

            if player_list_with_votes:
                for player in player_list_with_votes:
                    player_and_votes = { 
                        'Name': player.get('Name'),
                        'Points': "-" if player.get('IsObserver') else player.get('Points'),
                        'PlayerId': player.get('PlayerId'),
                        'IsObserver': player.get('IsObserver'),
                    }

                    player_and_votes_list.append(player_and_votes)

            total_point_votes_list = data["SessionStats"]["PointVotes"]
            
            respone = {
                'players': player_and_votes_list,
                'total_votes': total_point_votes_list,
                'average_points' : data['SessionStats'].get('AveragePointValue', 0),
            }
            return JsonResponse({"result": respone, 'status': 200}, safe=False)
 
        else:
            return JsonResponse({"result": 'Failed to fetch data, Check API', 'status': response.status_code}, safe=False)
 
    except Exception as ex:
            return JsonResponse({"result": 'Failed to fetch data, Check Logic'}, safe=False)

"""
This POST api save feedback into localhost's 
mysql database with user_name and feedback text
"""
@api_view(['POST'])
def create_feedback(request):
    if request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the new Feedback instance to the database
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# export MY_API_KEY='your_api_key_here' && python manage.py runserver -> run the server with the environment variable set
