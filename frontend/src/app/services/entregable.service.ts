import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Entregable {
  id: number;
  descripcion: string;
  fecha_entrega: string;
  archivo: string;
  estado: 'pendiente' | 'entregado';
  proyecto: number;
}

export interface NuevoEntregable {
  descripcion: string;
  fecha_entrega: string;
  archivo: string;
  estado: 'pendiente' | 'entregado';
  proyecto: number;
}

@Injectable({
  providedIn: 'root',
})
export class EntregableService {
  private readonly apiUrl =
    'http://127.0.0.1:8000/api/proyectos/entregables/';

  private readonly http = inject(HttpClient);

  obtenerEntregables(
    proyectoId: number,
  ): Observable<Entregable[]> {
    const params = new HttpParams().set(
      'proyecto',
      proyectoId.toString(),
    );

    return this.http.get<Entregable[]>(
      this.apiUrl,
      { params },
    );
  }

  crearEntregable(
    entregable: NuevoEntregable,
  ): Observable<Entregable> {
    return this.http.post<Entregable>(
      this.apiUrl,
      entregable,
    );
  }
}