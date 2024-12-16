from django.contrib import admin

from .models import *


admin.site.register(DrugType)
admin.site.register(Prescription)
admin.site.register(PrescriptionDetail)
