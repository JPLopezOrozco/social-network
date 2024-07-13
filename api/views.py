from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db.models import Count, Q

from .models import Group, ChatGroup, Chat, User
from .serializer import UserSerializer, GroupSerializer, ChatGroupSerializer, ChatSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        username = request.query_params.get('username')
        if username:
            self.queryset = self.queryset.filter(username=username)
        self.queryset = self.get_queryset()
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)



class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def list(self, request):    
        name = request.query_params.get('name')
        num_participants = request.query_params.get('num_participants') == "true"
        if name:
            self.queryset = self.queryset.filter(name=name)
        if num_participants:
            self.queryset = self.queryset.annotate(num_participants=Count('participants', filter=Q(participants__is_connected=True)))
        self.queryset = self.get_queryset()
        serializer = self.serializer_class(self.queryset, many=True, context={'num_participants':num_participants})
        return Response(serializer.data)
    

class ChatGroupViewSet(viewsets.ModelViewSet):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer


class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    

