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

        if cliente:
            queryset = queryset.filter(cliente_id=cliente)

        if estado:
            queryset = queryset.filter(estado=estado)

        if prioridad:
            queryset = queryset.filter(prioridad=prioridad)

        return queryset


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