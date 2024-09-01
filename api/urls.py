from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import  TokenRefreshView

from api import views


router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='User')
router.register(r'group', views.GroupViewSet, basename='Group')
router.register(r'chat', views.ChatViewSet, basename='Chat')
router.register(r'chat-group', views.ChatGroupViewSet, basename='ChatGroup')
router.register(r'posts', views.PostsViewSet, basename='Posts')

urlpatterns = [
    path('', include((router.urls, 'Social network'), namespace='Social network')),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]