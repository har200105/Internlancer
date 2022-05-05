from django.urls import path
from . import views


urlpatterns = [
    path('jobs/', views.getAllJobs, name='jobs'),
    path('job/<str:pk>', views.getJobById, name='job'),
    path('addJob', views.newJob, name='create_job')
]
