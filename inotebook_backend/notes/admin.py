from django.contrib import admin
from notes.models import Notes

# Register your models here.
@admin.register(Notes)
class NotesAdmin(admin.ModelAdmin):
    list_display = ['id', 'notes_text', 'user', 'created_at', 'modified_at']