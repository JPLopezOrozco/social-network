from rest_framework import serializers
from .models import Group, ChatGroup, Chat, User, Posts

class UserSerializer(serializers.ModelSerializer):
    followers = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all(), required=False)
    class Meta:
        model = User
        fields = 'id', 'username', 'password', 'email','first_name', 'last_name', 'is_connected', 'following', 'followers'
    def create(self, validated_data):
           user = User.objects.create(
               username=validated_data['username'],
               email=validated_data['email']
           )
           user.set_password(validated_data['password'])
           user.save()
           return user

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        exclude = ('image',)
        

class ChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'
        
class PostsSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True, use_url=True)
    class Meta:
        model = Posts
        fields = '__all__'