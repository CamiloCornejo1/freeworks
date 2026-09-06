from django.urls import path

from .views import (
    ClienteListCreateView,
    ComentarioListCreateView,
    EntregableListCreateView,
    ProyectoListCreateView,
)

urlpatterns = [
    path(
        '',
        ProyectoListCreateView.as_view(),
        name='proyecto-list-create',
    ),
    path(
        'clientes/',
        ClienteListCreateView.as_view(),
        name='cliente-list-create',
    ),
    path(
        'entregables/',
        EntregableListCreateView.as_view(),
        name='entregable-list-create',
    ),
    path(
        'comentarios/',
        ComentarioListCreateView.as_view(),
        name='comentario-list-create',
    ),
]