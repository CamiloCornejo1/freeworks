import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  NuevoProyecto,
  Proyecto,
  ProyectoService,
} from './services/proyecto.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly proyectoService = inject(ProyectoService);

  proyectos = signal<Proyecto[]>([]);
  cargando = signal(true);
  error = signal('');
  mensaje = signal('');

  nuevoProyecto: NuevoProyecto = {
    nombre: '',
    descripcion: '',
    cliente: 1,
    fecha_inicio: '',
    fecha_entrega: '',
    estado: 'pendiente',
    prioridad: 'media',
  };

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.obtenerProyectos().subscribe({
      next: (proyectos) => {
        this.proyectos.set(proyectos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar los proyectos.');
        this.cargando.set(false);
      },
    });
  }

  crearProyecto(): void {
    this.error.set('');
    this.mensaje.set('');

    this.proyectoService.crearProyecto(this.nuevoProyecto).subscribe({
      next: (proyecto) => {
        this.proyectos.update((proyectos) => [...proyectos, proyecto]);
        this.mensaje.set('Proyecto creado correctamente.');

        this.nuevoProyecto = {
          nombre: '',
          descripcion: '',
          cliente: 1,
          fecha_inicio: '',
          fecha_entrega: '',
          estado: 'pendiente',
          prioridad: 'media',
        };
      },
      error: () => {
        this.error.set('No fue posible crear el proyecto.');
      },
    });
  }
}