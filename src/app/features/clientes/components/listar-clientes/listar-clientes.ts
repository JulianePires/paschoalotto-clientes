import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalConfirmacao } from '../../../../core/components/modal-confirmacao/modal-confirmacao';
import { ClienteService } from '../../../../shared/services/cliente.service';
import { ICliente } from '../../../../shared/types/cliente.type';
import { ClientesModule } from '../../clientes-module';

@Component({
  selector: 'app-listar-clientes',
  imports: [ClientesModule, MatPaginatorModule],
  templateUrl: './listar-clientes.html',
})
export class ListarClientes implements OnInit {
  clientes: ICliente[] = [];
  paginaAtual = 1;
  limitePorPagina = 10;
  buscaCliente = '';
  clienteService = inject(ClienteService);
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.listarClientes();
  }

  listarClientes() {
    this.clienteService
      .buscarClientes({
        page: this.paginaAtual,
        limit: this.limitePorPagina,
        search: this.buscaCliente,
      })
      .subscribe((data) => {
        this.clientes = data;
      });
  }

  prepararExclusaoCliente(id: string) {
    const dialogRef = this.dialog.open(ModalConfirmacao, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Tem certeza que deseja excluir este cliente?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.confirmarExclusao(id);
      }
    });
  }

  confirmarExclusao(id: string) {
    this.clienteService.deletarCliente(Number(id)).subscribe({
      next: () => {
        this.listarClientes();
      },
      error: (err) => {
        console.error('ListarClientes: erro ao deletar cliente', err);
      },
    });
  }

  // Helpers for template interaction
  changePage(page: number) {
    if (page === this.paginaAtual) return;
    this.paginaAtual = page;
    this.listarClientes();
  }

  changeLimit(limit: number) {
    if (limit === this.limitePorPagina) return;
    this.limitePorPagina = limit;
    this.paginaAtual = 1;
    this.listarClientes();
  }

  updateSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    if (term === this.buscaCliente) return;
    this.buscaCliente = term;
    this.paginaAtual = 1;
    this.listarClientes();
  }

  trackById(_: number, cliente: ICliente) {
    return cliente?.id;
  }
}
