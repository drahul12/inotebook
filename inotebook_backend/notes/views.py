from notes.serializer import NotesSerializer

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from accounts.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from notes.models import Notes
from django.http import Http404


# Create your views here.
class NotesView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Notes.objects.get(pk=pk, user=user)
        except Notes.DoesNotExist:
            raise Http404

    def get(self, request, pk=None, format=None):
        if pk is not None:
            note = self.get_object(pk, request.user)
            serializer = NotesSerializer(note)
            return Response(serializer.data)
        notes = Notes.objects.filter(user=request.user)
        serializer = NotesSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NotesSerializer(data=request.data, context={'user':request.user})
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response({"msg": "Note Added"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk, format=None):
        note = self.get_object(pk, request.user)
        serializer = NotesSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response({"msg": "Note Updated"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        note = self.get_object(pk, request.user)
        note.delete()
        return Response({"msg": "Note Deleted"}, status=status.HTTP_200_OK)
    
