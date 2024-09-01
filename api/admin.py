from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import  Chat, ChatGroup, Group, User, Message, Posts, Replies

class UserAdmin(BaseAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'image')}),
        ('extra', {'fields':( 'following',)})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'image')}
        ),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Chat)
admin.site.register(ChatGroup)
admin.site.register(Group)
admin.site.register(Message)
admin.site.register(Posts)
admin.site.register(Replies)

