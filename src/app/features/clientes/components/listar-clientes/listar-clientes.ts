import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InputBusca } from '../../../../core/components/input-busca/input-busca';
import { ModalConfirmacao } from '../../../../core/components/modal-confirmacao/modal-confirmacao';
import { ClienteService } from '../../../../shared/services/cliente.service';
import { ICliente } from '../../../../shared/types/cliente.type';
import { ItemCliente } from '../item-cliente/item-cliente';

@Component({
  selector: 'app-listar-clientes',
  imports: [MatPaginatorModule, ItemCliente, InputBusca, MatButtonModule, MatExpansionModule],
  templateUrl: './listar-clientes.html',
})
export class ListarClientes implements OnInit, OnChanges {
  clientes: ICliente[] = [];
  totalClientes = 0;
  paginaAtual = 1;
  limitePorPagina = 10;
  buscaCliente = '';
  clienteService = inject(ClienteService);
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.listarClientes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buscaCliente'] || changes['paginaAtual'] || changes['limitePorPagina']) {
      this.listarClientes();
    }
  }

  listarClientes() {
    this.clienteService
      .buscarClientes({
        page: this.paginaAtual,
        limit: this.limitePorPagina,
        search: this.buscaCliente,
      })
      .subscribe((res) => {
        this.clientes = res.data;
        this.totalClientes = res.total;
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
    this.clienteService.deletarCliente(id).subscribe({
      next: () => {
        this.listarClientes();
      },
      error: (err) => {
        console.error('ListarClientes: erro ao deletar cliente', err);
      },
    });
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

  atualizarPaginacao(event: any) {
    const novaPagina = event.pageIndex + 1;
    const novoLimite = event.pageSize;

    if (novaPagina !== this.paginaAtual || novoLimite !== this.limitePorPagina) {
      this.paginaAtual = novaPagina;
      this.limitePorPagina = novoLimite;
      this.listarClientes();
    }
  }
}
