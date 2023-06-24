import { Pipe, PipeTransform } from '@angular/core';
import { EstadoHabitacion } from '../models/habitacion.model';

@Pipe({
  name: 'reserva_estado'
})
export class ReservaEstadoPipe implements PipeTransform {

  transform(item: any): string {
    switch (item){
      case EstadoHabitacion.Ocupada: return 'Ocupada';
      case EstadoHabitacion.Mantenimiento: return 'Mantenimiento';
      default: return 'Libre'
    }
  }

}
