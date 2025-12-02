import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClienteService } from '../../../../shared/services/cliente.service';
import { AcoesCliente } from '../acoes-cliente/acoes-cliente';
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-item-cliente',
  imports: [MatExpansionModule, AcoesCliente, A11yModule],
  templateUrl: './item-cliente.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCliente {
  readonly panelOpenState = signal(false);
  nome = input('');
  telefone = input('');
  cidade = input('');
  logotipo = input('');
  id = input('');
  excluir = output<string>(); 
  service = inject(ClienteService);

  excluirCliente() {
    this.excluir.emit(this.id());
  }
}
