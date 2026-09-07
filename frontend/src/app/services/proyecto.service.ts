import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/proyectos/';
  private readonly http = inject(HttpClient);

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }
}