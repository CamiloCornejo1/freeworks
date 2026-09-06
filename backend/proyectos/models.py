from django.db import models


class Proyecto(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('en_progreso', 'En progreso'),
        ('completado', 'Completado'),
    ]

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    cliente = models.CharField(max_length=200)
    fecha_inicio = models.DateField()
    fecha_entrega = models.DateField()
    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='pendiente'
    )
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre