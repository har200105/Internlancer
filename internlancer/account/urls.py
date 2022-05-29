from django.urls import path
from . import views


urlpatterns = [
    path('register', views.register, name='register'),
    path('me', views.currentUser, name='get_me'),
    path('me/update', views.updateUser, name='update_user'),
    path('upload/resume', views.uploadResume, name='upload_resume'),
]
