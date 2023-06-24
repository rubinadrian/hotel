import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchsService {
  
  modalHomeHabitacion = new EventEmitter<any>();

  constructor() { 
    
  }
}
