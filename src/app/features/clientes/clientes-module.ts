import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core-module';
import { SharedModule } from '../../shared/shared-module';
import { ComponentsModule } from './components/components-module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    SharedModule
  ]
})
export class ClientesModule { }
