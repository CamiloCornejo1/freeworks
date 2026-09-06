from django.urls import path
from .views import ProyectoListCreateView

urlpatterns = [
    path('', ProyectoListCreateView.as_view(), name='proyecto-list-create'),
]