from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404


 
class User(AbstractUser):
    following = models.ManyToManyField('self', symmetrical=False, related_name='followers', blank=True)
    is_connected = models.BooleanField(default=False)
    image = models.ImageField(blank=True, default='media/profile_default.png',upload_to='media')
    
    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        if self.id:
            image = get_object_or_404(User, id=self.id)
            if image.image != self.image and image.image != 'media/profile_default.png':
                image.image.delete(save=False)
            if not self.image:
                self.image = 'media/profile_default.png'
        super(User, self).save(*args, **kwargs)
    
    

class Group(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(max_length=255)
    owner = models.ForeignKey(User, related_name='owner', on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, related_name='user_groups')
    image = models.ImageField(blank=True, default='media/group_default.jpeg' , upload_to='media')
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if self.id:
            image = get_object_or_404(Group, id=self.id)
            if image.image != self.image and image.image != 'media/group_default.jpeg':
                image.image.delete(save=False)
            if not self.image:
                self.image = 'media/group_default.jpeg'
        super(Group, self).save(*args, **kwargs)
    

class ChatGroup(models.Model):
    group = models.OneToOneField(Group, related_name='chat', on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, related_name='chats')
    
    def __str__(self):
        return (f"Chat from {self.group.name}'s groups")


class Chat(models.Model):
    user1 = models.ForeignKey(User, related_name='chats_user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name='chats_user2', on_delete=models.CASCADE)

    def __str__(self):
        return f"Chat between {self.user1.username} and {self.user2.username}"

    def clean(self):
        if self.user1 == self.user2:
            raise ValidationError("Users in a chat must be different.")
        if Chat.objects.filter(user1=self.user1, user2=self.user2).exists() or \
           Chat.objects.filter(user1=self.user2, user2=self.user1).exists():
            raise ValidationError("A chat between these two users already exists.")
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
        
        
# class Message(models.Model):
#     chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
#     sender = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE)
#     content = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Message from {self.sender.username} in chat {self.chat.id}"