import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  imports: [],
  templateUrl: './editar-cliente.html',
})
export class EditarCliente {
  private route = inject(ActivatedRoute);
  idUsuario: string | null = this.route.snapshot.paramMap.get('id');
}
