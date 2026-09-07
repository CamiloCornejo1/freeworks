import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  FiltrosProyecto,
  NuevoProyecto,
  Proyecto,
  ProyectoService,
} from './services/proyecto.service';

import {
  Cliente,
  ClienteService,
} from './services/cliente.service';

import {
  Entregable,
  EntregableService,
  NuevoEntregable,
} from './services/entregable.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly proyectoService = inject(ProyectoService);
  private readonly clienteService = inject(ClienteService);
  private readonly entregableService = inject(EntregableService);

  proyectos = signal<Proyecto[]>([]);
  clientes = signal<Cliente[]>([]);
  entregables = signal<Entregable[]>([]);

  cargando = signal(true);
  error = signal('');
  mensaje = signal('');

  proyectoEditandoId = signal<number | null>(null);
  proyectoEntregablesId = signal<number | null>(null);

  filtros: FiltrosProyecto = {
    cliente: undefined,
    estado: '',
    prioridad: '',
  };

  nuevoProyecto: NuevoProyecto = {
    nombre: '',
    descripcion: '',
    cliente: 0,
    fecha_inicio: '',
    fecha_entrega: '',
    estado: 'pendiente',
    prioridad: 'media',
  };

  nuevoEntregable: NuevoEntregable = {
    descripcion: '',
    fecha_entrega: '',
    archivo: '',
    estado: 'pendiente',
    proyecto: 0,
  };

  ngOnInit(): void {
    this.cargarProyectos();
    this.cargarClientes();
  }

  cargarProyectos(): void {
    this.cargando.set(true);
    this.error.set('');

    this.proyectoService.obtenerProyectos(this.filtros).subscribe({
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

  aplicarFiltros(): void {
    this.cargarProyectos();
  }

  limpiarFiltros(): void {
    this.filtros = {
      cliente: undefined,
      estado: '',
      prioridad: '',
    };

    this.cargarProyectos();
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
      next: () => {
        this.mensaje.set('Proyecto creado correctamente.');
        this.limpiarFormulario();
        this.cargarProyectos();
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
        next: () => {
          this.mensaje.set('Proyecto actualizado correctamente.');
          this.limpiarFormulario();
          this.cargarProyectos();
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
        if (this.proyectoEditandoId() === id) {
          this.limpiarFormulario();
        }

        if (this.proyectoEntregablesId() === id) {
          this.proyectoEntregablesId.set(null);
          this.entregables.set([]);
          this.limpiarFormularioEntregable();
        }

        this.mensaje.set('Proyecto eliminado correctamente.');
        this.cargarProyectos();
      },
      error: () => {
        this.error.set('No fue posible eliminar el proyecto.');
      },
    });
  }

  seleccionarProyectoEntregables(proyecto: Proyecto): void {
    this.proyectoEntregablesId.set(proyecto.id);
    this.nuevoEntregable.proyecto = proyecto.id;
    this.cargarEntregables(proyecto.id);
    this.mensaje.set('');
    this.error.set('');
  }

  cargarEntregables(proyectoId: number): void {
    this.entregableService.obtenerEntregables(proyectoId).subscribe({
      next: (entregables) => {
        this.entregables.set(entregables);
      },
      error: () => {
        this.error.set('No fue posible cargar los entregables.');
      },
    });
  }

  crearEntregable(): void {
    const proyectoId = this.proyectoEntregablesId();

    if (proyectoId === null) {
      return;
    }

    this.error.set('');
    this.mensaje.set('');

    this.nuevoEntregable.proyecto = proyectoId;

    this.entregableService
      .crearEntregable(this.nuevoEntregable)
      .subscribe({
        next: () => {
          this.mensaje.set('Entregable creado correctamente.');
          this.limpiarFormularioEntregable();
          this.nuevoEntregable.proyecto = proyectoId;
          this.cargarEntregables(proyectoId);
        },
        error: () => {
          this.error.set('No fue posible crear el entregable.');
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

  limpiarFormularioEntregable(): void {
    this.nuevoEntregable = {
      descripcion: '',
      fecha_entrega: '',
      archivo: '',
      estado: 'pendiente',
      proyecto: 0,
    };
  }
}