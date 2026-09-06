from rest_framework import serializers
from .models import Cliente, Comentario, Entregable, Proyecto


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'


class EntregableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entregable
        fields = '__all__'


class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = '__all__'


class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = '__all__'