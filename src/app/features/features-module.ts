import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesModule } from './clientes/clientes-module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientesModule
  ],
  exports: [
    ClientesModule
  ]
})
export class FeaturesModule { }
