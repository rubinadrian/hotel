import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion,EstadoHabitacion } from './habitacion.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  url = 'http://localhost:3000/api/habitaciones';

  constructor(private http: HttpClient) { }

  get(): Observable<Habitacion[]> {  
    return this.http.get<Habitacion[]>(this.url);
  }

  save() {
    return this.http.post(this.url, JSON.parse('{"id":1,"camas_simples":1,"camas_matrimoniales":0,"estado":0,"ejecutiva":0}'));
  }

  delete() {
    return this.http.delete(this.url + '/' + 23);
  }

}
