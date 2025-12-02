import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalConfirmacao } from '../../../../core/components/modal-confirmacao/modal-confirmacao';
import { ClienteService } from '../../../../shared/services/cliente.service';
import { ClientesModule } from '../../clientes-module';

@Component({
  selector: 'app-criar-cliente',
  imports: [
    CommonModule,
    ClientesModule,
  ],
  templateUrl: './criar-cliente.html',
})
export class CriarCliente {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  form = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
  });

  voltar() {
    this.router.navigate(['/']);
  }

  abrirConfirmacaoCriar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dialogRef = this.dialog.open(ModalConfirmacao, {
      data: {
        titulo: 'Confirmar Criação',
        mensagem: 'Deseja realmente criar este cliente?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.criarCliente();
      }
    });
  }

  criarCliente() {
    const payload = {
      nome: String(this.form.get('nome')?.value || ''),
      email: String(this.form.get('email')?.value || ''),
      telefone: String(this.form.get('telefone')?.value || ''),
      cidade: String(this.form.get('cidade')?.value || ''),
    };

    this.clienteService.criarCliente(payload as any).subscribe({
      next: (created) => {
        console.log('CriarCliente: cliente criado', created);
        this.snack.open('Cliente criado com sucesso', 'Fechar', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('CriarCliente: erro ao criar cliente', err);
        this.snack.open('Erro ao criar cliente', 'Fechar', { duration: 4000 });
      },
    });
  }

  telefoneBlur() {
    const ctrl = this.form.get('telefone');
    if (!ctrl) return;
    const raw = String(ctrl.value || '');
    const digits = raw.replace(/[^0-9+]/g, '');
    let formatted = digits;
    if (digits.startsWith('+55') && digits.length > 3) {
      formatted = '+55 ' + digits.slice(3);
    }
    ctrl.setValue(formatted, { emitEvent: false });
    const onlyDigits = digits.replace(/\D/g, '');
    if (onlyDigits.length < 8) {
      ctrl.setErrors({ invalidPhone: true });
    } else {
      const errors = ctrl.errors || {};
      delete errors['invalidPhone'];
      if (Object.keys(errors).length === 0) ctrl.setErrors(null);
      else ctrl.setErrors(errors);
    }
  }
}
