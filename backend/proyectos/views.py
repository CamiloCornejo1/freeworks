from django.db.models import Q
from rest_framework import generics

from .models import Cliente, Comentario, Entregable, Proyecto

from .serializers import (
    ClienteSerializer,
    ComentarioSerializer,
    EntregableSerializer,
    ProyectoSerializer,
)


class ProyectoListCreateView(generics.ListCreateAPIView):
    serializer_class = ProyectoSerializer

    def get_queryset(self):
        queryset = Proyecto.objects.all()

        cliente = self.request.query_params.get('cliente')
        estado = self.request.query_params.get('estado')
        prioridad = self.request.query_params.get('prioridad')
        busqueda = self.request.query_params.get('busqueda')

        if cliente:
            queryset = queryset.filter(cliente_id=cliente)

        if estado:
            queryset = queryset.filter(estado=estado)

        if prioridad:
            queryset = queryset.filter(prioridad=prioridad)

        if busqueda:
            queryset = queryset.filter(
                Q(nombre__icontains=busqueda)
                | Q(entregables__descripcion__icontains=busqueda)
            ).distinct()

        return queryset


class ProyectoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer


class ClienteListCreateView(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class EntregableListCreateView(generics.ListCreateAPIView):
    serializer_class = EntregableSerializer

    def get_queryset(self):
        queryset = Entregable.objects.all()

        proyecto = self.request.query_params.get('proyecto')

        if proyecto:
            queryset = queryset.filter(proyecto_id=proyecto)

        return queryset


class ComentarioListCreateView(generics.ListCreateAPIView):
    serializer_class = ComentarioSerializer

    def get_queryset(self):
        queryset = Comentario.objects.all()

        proyecto = self.request.query_params.get('proyecto')

        if proyecto:
            queryset = queryset.filter(proyecto_id=proyecto)

        return queryset