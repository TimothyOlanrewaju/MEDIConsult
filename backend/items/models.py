from django.db import models
from accounts.models import CustomUser as User


class ItemCategory(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Item(models.Model):
    item_category = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)
    title = models.CharField(
        max_length=225, unique=True, null=False, blank=False)
    description = models.TextField()
    stock = models.IntegerField(default=0)
    price = models.DecimalField(decimal_places=2, max_digits=12, default=00.00)
    date_created = models.DateTimeField(auto_now_add=True, auto_now=False)

    def __str__(self):
        return self.title
