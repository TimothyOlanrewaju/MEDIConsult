from rest_framework import serializers

from .models import *


class ClinicianSerializer(serializers.ModelSerializer):
    staff_info = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Clinician
        fields = '__all__'

    def get_staff_info(self, obj):
        return {
            "email": obj.staff.email,
            "category": obj.category.title
        }

    # def get_teaser(self, obj):
    #     return force_text(obj.content[:20])
