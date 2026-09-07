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
    progreso = serializers.SerializerMethodField()

    class Meta:
        model = Proyecto
        fields = [
            'id',
            'nombre',
            'descripcion',
            'cliente',
            'fecha_inicio',
            'fecha_entrega',
            'estado',
            'prioridad',
            'creado_en',
            'progreso',
        ]

    def get_progreso(self, obj):
        total_entregables = obj.entregables.count()

        if total_entregables == 0:
            return 0

        entregados = obj.entregables.filter(
            estado='entregado'
        ).count()

        return round((entregados / total_entregables) * 100)