import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from './services/cliente.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [ClienteService],
})
export class SharedModule { }
