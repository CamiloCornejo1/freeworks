import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly apiUrl =
    'http://127.0.0.1:8000/api/proyectos/clientes/';

  private readonly http = inject(HttpClient);

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }
}
