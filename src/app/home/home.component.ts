import { Component, OnInit } from '@angular/core';
import { Habitacion,EstadoHabitacion } from '../habitacion.model';
import { FilterPipe } from '../pipes/filter.pipe';
import { faBed,faCheck, faStop, faUsers, faWrench, faDoorClosed, faDoorOpen,faCertificate } from '@fortawesome/free-solid-svg-icons';
import { HabitacionService } from '../habitacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  faBed = faBed;
  faCheck = faCheck;
  faStop = faStop;
  faUsers = faUsers;
  faWrench = faWrench;
  faDoorClosed=faDoorClosed;
  faDoorOpen=faDoorOpen;
  faCertificate=faCertificate;
  habitaciones:Habitacion[] = [];
  filterTipo = "";
  filterEstado = "";

  constructor(private habService:HabitacionService) {}

  ngOnInit() {
    this.habService.delete().subscribe();
      this.habService.get().subscribe(
        (resp)=>{
          resp.forEach(h => this.habitaciones.push(new Habitacion(h.id, h.camas_simples,h.camas_matrimoniales,h.estado,h.ejecutiva)));
        },
        (error)=>{
          console.error('Error al obtener los datos:', error);
        }
      );
  }

  saveHabitacion() {
    this.habService.save().subscribe();
  }
}