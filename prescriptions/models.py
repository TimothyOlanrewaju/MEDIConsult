from django.db import models

from accounts.models import CustomUser as User


class DrugType(models.Model):
    title = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.title}"
    

class Prescription(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.firstname}"


class PrescriptionDetail(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE)
    item = models.CharField(max_length=255)
    type = models.ForeignKey(DrugType, on_delete=models.CASCADE)
    strength = models.CharField(max_length=255)
    # dose = models.CharField(max_length=255)
    frequency = models.CharField(max_length=255)
    duration = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.type} {self.item} {self.strength} || {self.prescription.customer.firstname}"
