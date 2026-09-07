import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  NuevoProyecto,
  Proyecto,
  ProyectoService,
} from './services/proyecto.service';

import {
  Cliente,
  ClienteService,
} from './services/cliente.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly proyectoService = inject(ProyectoService);
  private readonly clienteService = inject(ClienteService);

  proyectos = signal<Proyecto[]>([]);
  clientes = signal<Cliente[]>([]);
  cargando = signal(true);
  error = signal('');
  mensaje = signal('');
  proyectoEditandoId = signal<number | null>(null);

  nuevoProyecto: NuevoProyecto = {
    nombre: '',
    descripcion: '',
    cliente: 0,
    fecha_inicio: '',
    fecha_entrega: '',
    estado: 'pendiente',
    prioridad: 'media',
  };

  ngOnInit(): void {
    this.cargarProyectos();
    this.cargarClientes();
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

  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (clientes) => {
        this.clientes.set(clientes);
      },
      error: () => {
        this.error.set('No fue posible cargar los clientes.');
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
        this.limpiarFormulario();
      },
      error: () => {
        this.error.set('No fue posible crear el proyecto.');
      },
    });
  }

  editarProyecto(proyecto: Proyecto): void {
    this.proyectoEditandoId.set(proyecto.id);

    this.nuevoProyecto = {
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      cliente: proyecto.cliente,
      fecha_inicio: proyecto.fecha_inicio,
      fecha_entrega: proyecto.fecha_entrega,
      estado: proyecto.estado,
      prioridad: proyecto.prioridad,
    };

    this.mensaje.set('');
    this.error.set('');
  }

  actualizarProyecto(): void {
    const id = this.proyectoEditandoId();

    if (id === null) {
      return;
    }

    this.error.set('');
    this.mensaje.set('');

    this.proyectoService
      .actualizarProyecto(id, this.nuevoProyecto)
      .subscribe({
        next: (proyectoActualizado) => {
          this.proyectos.update((proyectos) =>
            proyectos.map((proyecto) =>
              proyecto.id === proyectoActualizado.id
                ? proyectoActualizado
                : proyecto,
            ),
          );

          this.mensaje.set('Proyecto actualizado correctamente.');
          this.limpiarFormulario();
        },
        error: () => {
          this.error.set('No fue posible actualizar el proyecto.');
        },
      });
  }

  eliminarProyecto(id: number): void {
    this.error.set('');
    this.mensaje.set('');

    this.proyectoService.eliminarProyecto(id).subscribe({
      next: () => {
        this.proyectos.update((proyectos) =>
          proyectos.filter((proyecto) => proyecto.id !== id),
        );

        if (this.proyectoEditandoId() === id) {
          this.limpiarFormulario();
        }

        this.mensaje.set('Proyecto eliminado correctamente.');
      },
      error: () => {
        this.error.set('No fue posible eliminar el proyecto.');
      },
    });
  }

  cancelarEdicion(): void {
    this.limpiarFormulario();
    this.mensaje.set('');
    this.error.set('');
  }

  limpiarFormulario(): void {
    this.proyectoEditandoId.set(null);

    this.nuevoProyecto = {
      nombre: '',
      descripcion: '',
      cliente: 0,
      fecha_inicio: '',
      fecha_entrega: '',
      estado: 'pendiente',
      prioridad: 'media',
    };
  }
}