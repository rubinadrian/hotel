export function formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}

export function obtenerFechasEnRango(fechaInicial:string, fechaFinal:string) {
    const fechas = [];
  
    const fechaActual = new Date(fechaInicial);
    const fechaFin = new Date(fechaFinal);
  
    while (fechaActual <= fechaFin) {
      fechas.push(new Date(fechaActual));
  
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
  
    return fechas;
  }