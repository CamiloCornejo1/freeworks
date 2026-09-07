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

        this.nuevoProyecto = {
          nombre: '',
          descripcion: '',
          cliente: 0,
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