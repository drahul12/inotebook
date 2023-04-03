from django.db import models
import uuid
from accounts.models import User

# Create your models here.
class Notes(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    notes_text = models.TextField(blank=False,null=False, editable=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.notes_text

    class Meta:
        ordering = ['notes_text']
