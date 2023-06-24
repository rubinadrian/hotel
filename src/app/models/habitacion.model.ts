export enum EstadoHabitacion {
  Libre,
  Ocupada,
  Mantenimiento
}

export class Habitacion {
    public capacidad: number;

    constructor(
        public id: number,
        public camas_simples: number,
        public camas_matrimoniales: number,
        public estado = EstadoHabitacion.Libre,
        public ejecutiva = false,
        public nombre: string,
        public importe: number
      ) { 
        this.capacidad = this.camas_simples + this.camas_matrimoniales*2;
      }
}
