from rest_framework import serializers
from .models import Group, ChatGroup, Chat, User

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = 'id', 'username', 'password', 'email','first_name', 'last_name', 'is_connected', 'following'
    def create(self, validated_data):
           user = User.objects.create(
               username=validated_data['username'],
               email=validated_data['email']
           )
           user.set_password(validated_data['password'])
           user.save()
           return user

class GroupSerializer(serializers.ModelSerializer):
    num_participants = serializers.SerializerMethodField()
    class Meta:
        model = Group
        exclude = ('participants', 'image')
    
    def get_num_participants(self, obj):
        if hasattr(obj, 'num_participants'):
           return obj.num_participants
        return None 
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_participants = self.context.get('num_participants')
        if not num_participants:
            data.pop('num_participants', None)
        return data
        

class ChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'