from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, firstname, lastname, email, phone, password, **otherfields):
        otherfields.setdefault('is_staff', True)
        otherfields.setdefault('is_superuser', True)
        otherfields.setdefault('is_active', True)

        if otherfields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff = True')
        if otherfields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff = True')

        return self.create_user(firstname, lastname, email, phone, password, **otherfields)

    def create_user(self, firstname, lastname, email, phone, password, **otherfields):
        if not email:
            raise ValueError(_('You must provide an email address'))
        email = self.normalize_email(email)
        user = self.model(firstname=firstname, lastname=lastname, email=email,
                          phone=phone, **otherfields)
        user.set_password(password)
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)
    firstname = models.CharField(max_length=150)
    lastname = models.CharField(max_length=150)
    phone = models.CharField(max_length=150, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_customer = models.BooleanField(default=True)
    is_clinician = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname', 'phone']

    def __str__(self):
        return self.email


class UserStatus(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    is_online = models.BooleanField(default=False)
    last_active = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user.email} - {'Online' if self.is_online else 'Offline'}"
