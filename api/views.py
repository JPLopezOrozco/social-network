from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Group, ChatGroup, Chat, User, Posts
from .serializer import UserSerializer, GroupSerializer, ChatGroupSerializer, ChatSerializer, PostsSerializer



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['password'] = user.password

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

    def list(self, request):
        username = request.query_params.get('username')
        queryset = super().get_queryset()
        if username:
            queryset = queryset.filter(username=username)
        
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)



class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    
    def list(self, request):    
        queryset = super().get_queryset()
        name = request.query_params.get('name')
        if name:
            queryset = queryset.filter(name=name)
        
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    

class ChatGroupViewSet(viewsets.ModelViewSet):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer
    permission_classes = [IsAuthenticated]


class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

class PostsViewSet(viewsets.ModelViewSet):
    queryset = Posts.objects.all().order_by(('-id'))
    serializer_class = PostsSerializer
    # permission_classes = [IsAuthenticated] 
    
    def list(self, request):
        queryset = super().get_queryset()
        user_id = request.query_params.get('user')
        follow = request.query_params.get('follow')
        home = request.query_params.get('home')
        if user_id:
            queryset = queryset.filter(user__id=user_id)
        if follow:
            users = User.objects.get(pk=follow)
            following = users.following.values_list('id', flat=True)
            queryset = queryset.filter(user__id__in= following)
        if home:
            queryset = queryset.exclude(user=home)           
            
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    

    
