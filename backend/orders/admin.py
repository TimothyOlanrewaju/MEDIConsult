from django.contrib import admin

from django.contrib import admin

from .models import *

admin.site.register(Order)
admin.site.register(OrderDetail)
admin.site.register(Delivery)
admin.site.register(DeliveryMode)
admin.site.register(Cart)
