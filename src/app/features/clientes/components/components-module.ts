import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarClientes } from './listar-clientes/listar-clientes';
import { CriarCliente } from './criar-cliente/criar-cliente';
import { EditarCliente } from './editar-cliente/editar-cliente';
import { ModalUpload } from './modal-upload/modal-upload';
import { ItemCliente } from './item-cliente/item-cliente';
import { AcoesCliente } from './acoes-cliente/acoes-cliente';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListarClientes,
    CriarCliente,
    EditarCliente,
    ModalUpload,
    AcoesCliente,
    ItemCliente,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    ListarClientes,
    CriarCliente,
    EditarCliente,
    ModalUpload,
    AcoesCliente,
    ItemCliente,
    MatButtonModule
  ]
})
export class ComponentsModule { }
