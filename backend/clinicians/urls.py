from django.urls import path

from .views import *

urlpatterns = [
    path('', ClinicianListCreateView.as_view())
]
