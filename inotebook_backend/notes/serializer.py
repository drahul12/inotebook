from rest_framework import serializers
from notes.models import Notes

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ['id', 'created_at','modified_at', 'notes_text']
    
    def create(self, validated_data):
        user = self.context.get('user')
        return Notes.objects.create(user=user, **validated_data)
    
    def update(self, instance, validated_data):
        instance.notes_text = validated_data.get('notes_text', instance.notes_text)
        instance.save()
        return instance