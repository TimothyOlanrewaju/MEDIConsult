from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from .models import *


class UserAdminConfig(UserAdmin):
    model = CustomUser
    search_fields = ('email', 'firstname', 'lastname', 'phone')
    list_filter = ('email', 'firstname', 'lastname', 'phone', 'is_active',
                   'is_staff', 'is_customer', 'is_clinician')
    list_display = ('email', 'firstname', 'lastname', 'phone', 'is_active',
                    'is_staff', 'is_customer', 'is_clinician')
    fieldsets = (
        (None, {'fields': ('email', 'firstname',
         'lastname',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        # ('Personal')
    )
    ordering = ('email',)


admin.site.register(CustomUser, UserAdminConfig)
admin.site.register(UserStatus)
