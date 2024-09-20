from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import *
from rest_framework.generics import *

from .models import CustomUser as User, UserStatus
from .serializers import CustomUserSerializer, UserStatusSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def get_user(request, email, phone):
    user = User.objects.filter(Q(email=email) | Q(phone=phone))
    serializer = CustomUserSerializer(user, many=True)
    data = serializer.data

    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def set_user_online(request, email):
    user = User.objects.get(email=email)
    UserStatus.objects.update_or_create(
        user=user, defaults={'is_online': True, 'last_active': timezone.now()})

    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def set_user_offline(request, email):
    user = User.objects.get(email=email)
    UserStatus.objects.filter(user=user).update(is_online=False)

    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_users_view(request):
    users = User.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    data = serializer.data

    return Response(data, status=status.HTTP_200_OK)


class UpdateActivityView(APIView):
    # permission_classes = [AllowAny]

    def post(self, request):
        UserStatus.objects.filter(user=request.user).update(
            last_active=timezone.now(), is_online=True)
        return Response({"status": "success"}, status=200)


class OnlineUsersView(ListAPIView):
    queryset = UserStatus.objects.filter(is_online=True)
    serializer_class = UserStatusSerializer
    permission_classes = [AllowAny]
