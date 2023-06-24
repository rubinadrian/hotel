import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion,EstadoHabitacion } from '../models/habitacion.model';
import { environment } from '../enviroments';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  url = environment.url + 'habitaciones';

  constructor(private http: HttpClient) { }

  get(): Observable<Habitacion[]> {  
    return this.http.get<Habitacion[]>(this.url);
  }

  save(hab:Habitacion) {
    return this.http.post(this.url, hab);
  }

  update(hab:Habitacion) {
    return this.http.patch(this.url, hab);
  }

  delete() {
    return this.http.delete(this.url + '/' + 23);
  }

}
