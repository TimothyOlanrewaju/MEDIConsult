from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.generics import *

from .serializers import *


class PrescriptionListCreateView(ListCreateAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated]


class DrugTypeListCreateView(ListCreateAPIView):
    queryset = DrugType.objects.all()
    serializer_class = DrugTypeSerializer
    permission_classes = [AllowAny]


class PrescriptionDetailsListCreateView(ListCreateAPIView):
    queryset = PrescriptionDetail.objects.all()
    serializer_class = PrescriptionDetailsSerializer
    permission_classes = [AllowAny]
