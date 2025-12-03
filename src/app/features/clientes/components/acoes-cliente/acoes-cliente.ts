import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acoes-cliente',
  imports: [MatButtonModule, MatIconModule],
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
