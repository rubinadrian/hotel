import { Component, Input, OnInit } from '@angular/core';
import { SwitchsService } from '../services/switchs.service';
import { Habitacion, EstadoHabitacion } from '../models/habitacion.model';
import { HabitacionService } from '../services/habitacion.service';
import { faDoorClosed, faKey, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { formatearFecha, obtenerFechasEnRango } from '../helpers';
import { ReservasService } from '../services/reservas.service';
import { Reserva } from '../models/reserva.model';
import Swal from'sweetalert2';

enum Menu {
  'Cobros',
  'Reservas',
  'Cancelaciones'
}


@Component({
  selector: 'app-modal-home-habitacion',
  templateUrl: './modal-home-habitacion.component.html',
  styleUrls: ['./modal-home-habitacion.component.css']
})
export class ModalHomeHabitacionComponent implements OnInit{
  //icons
  faDoorClosed=faDoorClosed;
  faKey=faKey;
  faCheckDouble=faCheckDouble;

  Menu=Menu;
  activeMenu = Menu.Reservas;
  huesped:string = '';
  importe = 0;
  selectedAll:boolean = false;
  fechaDesde:string = formatearFecha(new Date());
  fechaHasta:string = formatearFecha(new Date());
  reservasPendientes:Reserva[]= [];
  @Input() habitacion: Habitacion = new Habitacion(0,0,0,0,false,'',0);
  estados = EstadoHabitacion;

  constructor(private habService:HabitacionService, private swtch:SwitchsService, private reservaService:ReservasService){}
  
  ngOnInit(): void {
    this.importe = this.habitacion.importe;
   this.getReservasVigentes();
  }

  getReservasVigentes() {
    this.reservaService.getReservasVigentes({habitacion_id:this.habitacion.id})
      .subscribe((resp) => this.reservasPendientes = Object.values(resp));
  }
  
  closeModal(): void {
    this.swtch.modalHomeHabitacion.emit(false);
  }

  generarReservas() {
    const datos = {
      habitacion_id: this.habitacion.id,
      huesped: this.huesped,
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta,
      importe: this.importe
    };
    this.reservaService.generarReservas(datos).subscribe((response)=>{
      this.getReservasVigentes(); 
    },(error)=>{console.error(error)});
  }
  
  setEstado(estado:EstadoHabitacion) {
    this.habitacion.estado = estado;
    this.habService.update(this.habitacion).subscribe((response)=>{
      Swal.fire('','','success');
    },console.error);
  }

  delReservas() {
    if(this.cantReservasSel() == 0) return;
    this.confirm("Confirma cancelar las reservas seleccionadas?",()=>{this.reservaService.delReserva(this.reservasPendientes.filter((rp:Reserva) => rp.selected))
      .subscribe((response)=>{
        this.success2("Las reservas han sido canceladas.");
        this.getReservasVigentes(); 
      },console.error);});
  }

  selReserva(reserva:Reserva) {
    reserva.selected = !reserva.selected;
    this.selectedAll = this.isSelectedAll();
  }

  stopPropagation(event: Event){
    event.stopPropagation();
    this.selectedAll = this.isSelectedAll();
  }

  isSelectedAll():boolean {
    return this.reservasPendientes.filter((reserva:Reserva) => reserva.selected).length === this.reservasPendientes.length;
  }

  selectAllPendientes(valor:boolean) {
    this.selectedAll = valor;
    this.reservasPendientes.forEach(reserva => {
      reserva.selected = valor;
    });
  }

  pagarReservas() {
    if(this.cantReservasSel() == 0) return;
    this.confirm("Importe a cobrar: $" + this.impReservasSel(),
     ()=>{this.reservaService.pagarReservas(this.reservasPendientes.filter((rp:Reserva) => rp.selected))
      .subscribe((response)=>{
        this.success2("Las cuotas se pagaron.");
        this.getReservasVigentes(); 
      },console.error);});
  }

  impReservasSel() {
    return this.reservasPendientes.reduce((sum, reserva) => {
      if (reserva.selected) {
        return sum + reserva.importe;
      } else {
        return sum;
      }
    }, 0);
  }

  cantReservasSel() {
    return this.reservasPendientes.filter((reserva:Reserva) => reserva.selected).length;
  }

  success() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      width: '200px',
      color: '#fff',
      iconColor: '#fff',
      background: '#aeedac',
      title: '',
      showConfirmButton: false,
      timer: 1500
    });
  }

  success2(mensaje:string) {
    Swal.fire(
      'Correcto!',
      mensaje,
      'success'
    )
  }

  confirm(mensaje:string, callback:any) {
    Swal.fire({
      title: 'Confirmacion?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a93545',
      cancelButtonColor: '#999',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    })
  }

}
