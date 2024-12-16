from django.urls import path

from .views import *


urlpatterns = [
    path('', PrescriptionListCreateView.as_view()),
    path('drug_type/', DrugTypeListCreateView.as_view()),
    path('prescription_detail/', PrescriptionDetailsListCreateView.as_view()),
]
