import { Component, OnInit, inject, signal } from '@angular/core';

import {
  Proyecto,
  ProyectoService,
} from './services/proyecto.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly proyectoService = inject(ProyectoService);

  proyectos = signal<Proyecto[]>([]);
  cargando = signal(true);
  error = signal('');

  ngOnInit(): void {
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
}