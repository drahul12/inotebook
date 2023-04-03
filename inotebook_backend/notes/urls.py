
from django.urls import path
from notes.views import NotesView

urlpatterns = [
    path('', NotesView.as_view(), name='notes'),
    path('<pk>/', NotesView.as_view(), name='notes_detail'),
]
