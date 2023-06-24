export class Reserva {
  public selected:boolean = false;

    constructor(
        public id: number,
        public habitacion_id: number,
        public fecha: string,
        public huesped: string,
        public importe: number,
        public descuento: number,
        public estado: number
      ) {}
}
