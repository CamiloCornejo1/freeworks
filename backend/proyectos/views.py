from rest_framework import generics

from .models import Cliente, Comentario, Entregable, Proyecto

from .serializers import (
    ClienteSerializer,
    ComentarioSerializer,
    EntregableSerializer,
    ProyectoSerializer,
)


class ProyectoListCreateView(generics.ListCreateAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer


class ProyectoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer


class ClienteListCreateView(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class EntregableListCreateView(generics.ListCreateAPIView):
    queryset = Entregable.objects.all()
    serializer_class = EntregableSerializer


class ComentarioListCreateView(generics.ListCreateAPIView):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer