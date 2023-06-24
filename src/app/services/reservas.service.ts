import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion,EstadoHabitacion } from '../models/habitacion.model';
import { environment } from '../enviroments';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  url = environment.url + 'reservas/';

  constructor(private http: HttpClient) { }

  generarReservas(data:any) {
    return this.http.post(this.url + 'generar', data);
  }

  getReservasPend(data:any) {
    return this.http.post(this.url + 'pendientes', data); // data: {habitacion_id}
  }

  getReservasVigentes(data:any) {
    return this.http.post(this.url + 'vigentes', data); // data: {habitacion_id}
  }

  delReserva(ids:Reserva[]) {
    return this.http.delete(this.url + 'delete', {body:ids});
  }

  pagarReservas(reservas:Reserva[]) {
    return this.http.post(this.url + 'pagar', reservas);
  }
}
