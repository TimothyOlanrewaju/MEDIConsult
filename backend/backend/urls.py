from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('orders/', include('orders.urls')),
    path('clinicians/', include('clinicians.urls')),
    path('address/', include('addresses.urls')),
    path('consultations/', include('consultations.urls')),
    path('prescriptions/', include('prescriptions.urls')),

    path('accounts/', include('accounts.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls.authtoken')),
]
