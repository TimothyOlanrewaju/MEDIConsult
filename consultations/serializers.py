from rest_framework import serializers

from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    chat_from = serializers.SerializerMethodField(read_only=True)
    chat_to = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Message
        fields = '__all__'

    def get_chat_from(self, obj):
        return {'chat_from': f'{obj.sender.firstname} {obj.sender.lastname}'}

    def get_chat_to(self, obj):
        return {'chat_to': f'{obj.receiver.firstname} {obj.receiver.lastname}'}
