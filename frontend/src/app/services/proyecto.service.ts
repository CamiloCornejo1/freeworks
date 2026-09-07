import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  cliente: number;
  fecha_inicio: string;
  fecha_entrega: string;
  estado: 'pendiente' | 'en_progreso' | 'completado';
  prioridad: 'alta' | 'media' | 'baja';
  creado_en: string;
}

export interface NuevoProyecto {
  nombre: string;
  descripcion: string;
  cliente: number;
  fecha_inicio: string;
  fecha_entrega: string;
  estado: 'pendiente' | 'en_progreso' | 'completado';
  prioridad: 'alta' | 'media' | 'baja';
}

export interface FiltrosProyecto {
  cliente?: number;
  estado?: string;
  prioridad?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private readonly apiUrl =
    'http://127.0.0.1:8000/api/proyectos/';

  private readonly http = inject(HttpClient);

  obtenerProyectos(
    filtros: FiltrosProyecto = {},
  ): Observable<Proyecto[]> {
    let params = new HttpParams();

    if (filtros.cliente) {
      params = params.set(
        'cliente',
        filtros.cliente.toString(),
      );
    }

    if (filtros.estado) {
      params = params.set(
        'estado',
        filtros.estado,
      );
    }

    if (filtros.prioridad) {
      params = params.set(
        'prioridad',
        filtros.prioridad,
      );
    }

    return this.http.get<Proyecto[]>(
      this.apiUrl,
      { params },
    );
  }

  crearProyecto(
    proyecto: NuevoProyecto,
  ): Observable<Proyecto> {
    return this.http.post<Proyecto>(
      this.apiUrl,
      proyecto,
    );
  }

  actualizarProyecto(
    id: number,
    proyecto: NuevoProyecto,
  ): Observable<Proyecto> {
    return this.http.put<Proyecto>(
      `${this.apiUrl}${id}/`,
      proyecto,
    );
  }

  eliminarProyecto(
    id: number,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}${id}/`,
    );
  }
}