import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarClientes } from './listar-clientes/listar-clientes';
import { CriarCliente } from './criar-cliente/criar-cliente';
import { EditarCliente } from './editar-cliente/editar-cliente';
import { ModalUpload } from './modal-upload/modal-upload';
import { ItemCliente } from './item-cliente/item-cliente';
import { AcoesCliente } from './acoes-cliente/acoes-cliente';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule
  ],
  exports: [
    CommonModule,
    ListarClientes,
    CriarCliente,
    EditarCliente,
    ModalUpload,
    AcoesCliente,
    ItemCliente,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule
  ],
})
export class ComponentsModule {}
