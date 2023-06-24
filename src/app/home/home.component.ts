import { Component, OnInit } from '@angular/core';
import { Habitacion,EstadoHabitacion } from '../models/habitacion.model';
import { FilterPipe } from '../pipes/filter.pipe';
import { faBed,faCheck, faStop, faUsers, faWrench, faDoorClosed, faDoorOpen,faCertificate } from '@fortawesome/free-solid-svg-icons';
import { HabitacionService } from '../services/habitacion.service';
import { SwitchsService } from '../services/switchs.service';

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
  showModalHabitacion = false;
  habitacion_seleccionada:Habitacion = new Habitacion(0,0,0,0,false,'',0);

  constructor(private habService:HabitacionService, private swtch:SwitchsService) {}
  

  ngOnInit() {
    this.getAllHabitaciones();
    this.swtch.modalHomeHabitacion.subscribe((isShow)=> {
      this.showModalHabitacion = isShow;
      this.getAllHabitaciones();
    });
  }

  getAllHabitaciones() {
    this.habitaciones = [];
    this.habService.get().subscribe(
      (resp)=>{
        resp.forEach(h => this.habitaciones.push(new Habitacion(h.id, h.camas_simples,h.camas_matrimoniales,h.estado,h.ejecutiva,h.nombre,h.importe)));
      },
      (error)=>{
        console.error('Error al obtener los datos:', error);
      }
    );
  }
  showModal(h:Habitacion) {
    this.habitacion_seleccionada = h;
    this.swtch.modalHomeHabitacion.emit(true);
  }
}