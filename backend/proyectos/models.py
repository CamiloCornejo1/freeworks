from django.db import models


class Cliente(models.Model):
    nombre = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre


class Proyecto(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('en_progreso', 'En progreso'),
        ('completado', 'Completado'),
    ]

    PRIORIDADES = [
        ('alta', 'Alta'),
        ('media', 'Media'),
        ('baja', 'Baja'),
    ]

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.CASCADE,
        related_name='proyectos'
    )
    fecha_inicio = models.DateField()
    fecha_entrega = models.DateField()
    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='pendiente'
    )
    prioridad = models.CharField(
        max_length=10,
        choices=PRIORIDADES,
        default='media'
    )
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


class Entregable(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('entregado', 'Entregado'),
    ]

    proyecto = models.ForeignKey(
        Proyecto,
        on_delete=models.CASCADE,
        related_name='entregables'
    )
    descripcion = models.TextField()
    fecha_entrega = models.DateField()
    archivo = models.CharField(max_length=255, blank=True)
    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='pendiente'
    )

    def __str__(self):
        return f'{self.proyecto.nombre} - {self.descripcion}'


class Comentario(models.Model):
    proyecto = models.ForeignKey(
        Proyecto,
        on_delete=models.CASCADE,
        related_name='comentarios'
    )
    texto = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comentario en {self.proyecto.nombre}'