import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesModule } from '../../clientes-module';

@Component({
  selector: 'app-acoes-cliente',
  imports: [ClientesModule],
  templateUrl: './acoes-cliente.html',
})
export class AcoesCliente {
  idCliente = input('');
  onExcluir = output<void>();
  router = inject(Router);

  onEditarCliente() {
    this.router.navigate(['/editar', this.idCliente()]);
  }

  onExcluirCliente() {
    this.onExcluir.emit();
  }
}
