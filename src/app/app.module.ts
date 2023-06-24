import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modulos Terceros
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 

//Modulos Propios
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ModalHomeHabitacionComponent } from './modal-home-habitacion/modal-home-habitacion.component';

//Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { ReservaEstadoPipe } from './pipes/reserva_estado.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    FilterPipe,
    ReservaEstadoPipe,
    ModalHomeHabitacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
