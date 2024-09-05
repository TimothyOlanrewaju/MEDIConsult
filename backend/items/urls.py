from django.urls import path

from .views import *


urlpatterns = [
    path('', ItemListCreateView.as_view()),
    path('item_detail/<pk>/', ItemRetrieveUpdateView.as_view())
]
