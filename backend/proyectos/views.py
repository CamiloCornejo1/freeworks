from rest_framework import generics
from .models import Proyecto
from .serializers import ProyectoSerializer


class ProyectoListCreateView(generics.ListCreateAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer