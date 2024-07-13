from django.db.models.signals import post_save, m2m_changed, pre_delete
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from .models import Group, ChatGroup, User
import os


@receiver(m2m_changed, sender=Group.participants.through)
def add_owner(sender, instance, action, **kwargs):
    if action in ['post_add', 'post_remove']:
        participants = instance.participants
        if not participants.filter(id=instance.owner.id).exists():
            participants.add(instance.owner)
    
@receiver(post_save, sender=Group)
def create_group_chat_and_add_owner(sender, instance, created, **kwargs):
    if created:
        ChatGroup.objects.create(group=instance)


@receiver(m2m_changed, sender=Group.participants.through)
def update_participants_to_chat(sender, instance, action, **kwargs):
    if action in ['post_add', 'post_remove', 'post_clear']:
        chat_group = instance.chat
        chat_group.participants.set(instance.participants.all())

@receiver(user_logged_in)
def user_logged_in_handler(sender, request, user, **kwargs):
    user.is_connected = True
    user.save()

@receiver(user_logged_out)
def user_logged_out_handler(sender, request, user, **kwargs):
    user.is_connected = False
    user.save()

@receiver(pre_delete, sender=User)
def user_image_delete(sender, instance, **kwargs):
    if hasattr(instance, 'image'):
        file_field = instance.image
        if file_field:
            print(file_field)
            if file_field.name == 'media/profile_default.png':
                return
            file_path = file_field.path
            if os.path.isfile(file_path):
                os.remove(file_path)
                
@receiver(pre_delete, sender=Group)
def group_image_delete(sender, instance, **kwargs):
    if hasattr(instance, 'image'):
        file_field = instance.image
        if file_field:
            if file_field.name == 'media/group_default.jpeg':
                return
            file_path = file_field.path
            if os.path.isfile(file_path):
                os.remove(file_path)