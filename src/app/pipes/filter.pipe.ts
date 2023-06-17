import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], tipo:string, estado:string): any[] {
    let temp = items;
    if(tipo !== '') {
      temp = temp.filter(item=>(item.tipo === tipo));
    }

    if(estado !== '') {
      temp = temp.filter(item=>(item.estado === estado));
    }
    return temp;
  }

}
