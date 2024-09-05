from rest_framework.generics import *

from .models import *
from .serializers import *


class ClinicianListCreateView(ListCreateAPIView):
    queryset = Clinician.objects.all()
    serializer_class = ClinicianSerializer
