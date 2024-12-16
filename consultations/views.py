from django.shortcuts import render
from rest_framework.generics import *
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import *
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q

from .serializers import MessageSerializer
from .models import Message
from accounts.models import CustomUser


class MessageCreateView(CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_receiver_view(request, sender, receiver):
    chat_members = Message.objects.filter(
        Q(sender_id=sender, receiver_id=receiver) | Q(sender_id=receiver, receiver_id=sender))
    serializer = MessageSerializer(chat_members, many=True)
    data = serializer.data

    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat_list_view(request, user_id):
    user = CustomUser.objects.get(id=user_id)
    # Get distinct users the current user has either sent messages to or received messages from
    sent_partners = Message.objects.filter(sender=user.id).values_list('receiver', flat=True)
    received_partners = Message.objects.filter(receiver=user.id).values_list('sender', flat=True)

    # Combine and deduplicate the partner IDs
    all_partner_ids = set(sent_partners).union(set(received_partners))

    # Fetch User objects based on these IDs
    chat_partners = CustomUser.objects.filter(id__in=all_partner_ids)

    # Serialize the chat partners and current user's data
    partner_data = [{"id": partner.id, "name": f'{partner.firstname} {partner.lastname}'} for partner in chat_partners]
    current_user_data = {"id": user_id, "name": f'{user.firstname} {user.lastname}'}

    return Response({
        "current_user": current_user_data,
        "chat_partners": partner_data
    })
