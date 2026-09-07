import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comentario {
  id: number;
  texto: string;
  fecha: string;
  proyecto: number;
}

export interface NuevoComentario {
  texto: string;
  proyecto: number;
}

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private readonly apiUrl =
    'http://127.0.0.1:8000/api/proyectos/comentarios/';

  private readonly http = inject(HttpClient);

  obtenerComentarios(
    proyectoId: number,
  ): Observable<Comentario[]> {
    const params = new HttpParams().set(
      'proyecto',
      proyectoId.toString(),
    );

    return this.http.get<Comentario[]>(
      this.apiUrl,
      { params },
    );
  }

  crearComentario(
    comentario: NuevoComentario,
  ): Observable<Comentario> {
    return this.http.post<Comentario>(
      this.apiUrl,
      comentario,
    );
  }
}