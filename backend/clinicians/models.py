from django.db import models
from accounts.models import CustomUser as User


class Category(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Clinician(models.Model):
    staff = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    licence_expiry_date = models.DateField()
    licence_image = models.ImageField(
        upload_to='licence/', blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.staff}"
