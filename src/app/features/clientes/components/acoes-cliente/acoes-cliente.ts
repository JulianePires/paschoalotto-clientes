import { Component, inject, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-acoes-cliente',
  imports: [MatIconButton, MatIconModule],
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
