from rest_framework import serializers

from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Item
        fields = ['id', 'category', 'title', 'description', 'price']

    def get_category(self, obj):
        return obj.item_category.title
