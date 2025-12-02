import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { InputBusca } from './input-busca/input-busca';
import { ModalConfirmacao } from './modal-confirmacao/modal-confirmacao';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Footer,
    Header,
    InputBusca,
    ModalConfirmacao
  ],
  exports: [
    Footer,
    Header,
    InputBusca,
    ModalConfirmacao
  ]
})
export class ComponentsModule { }
