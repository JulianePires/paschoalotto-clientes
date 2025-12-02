import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarClientes } from './listar-clientes/listar-clientes';
import { CriarCliente } from './criar-cliente/criar-cliente';
import { EditarCliente } from './editar-cliente/editar-cliente';
import { ModalUpload } from './modal-upload/modal-upload';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListarClientes,
    CriarCliente,
    EditarCliente,
    ModalUpload
  ],
  exports: [
    ListarClientes,
    CriarCliente,
    EditarCliente,
    ModalUpload
  ]
})
export class ComponentsModule { }
