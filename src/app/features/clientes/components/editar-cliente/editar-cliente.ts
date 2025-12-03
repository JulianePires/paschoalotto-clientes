import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalConfirmacao } from '../../../../core/components/modal-confirmacao/modal-confirmacao';
import { ClienteService } from '../../../../shared/services/cliente.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-editar-cliente',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './editar-cliente.html',
})
export class EditarCliente implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  private route = inject(ActivatedRoute);
  idUsuario: string | null = this.route.snapshot.paramMap.get('id');
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  form = this.fb.group({
    logotipo: [''],
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
  });

  ngOnInit() {
    this.buscarInfoCliente();
  }

  voltar() {
    this.router.navigate(['/']);
  }

  abrirConfirmacaoEditar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dialogRef = this.dialog.open(ModalConfirmacao, {
      data: {
        titulo: 'Confirmar Edição',
        mensagem: 'Deseja realmente editar este cliente?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editarCliente();
      }
    });
  }

  buscarInfoCliente() {
    this.clienteService.buscarClientePorId(this.idUsuario!).subscribe({
      next: (cliente) => {
        this.form.patchValue({
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
          cidade: cliente.cidade,
          logotipo: cliente.logotipo || '',
        });
      },
      error: (err) => {
        console.error('EditarCliente: erro ao buscar info do cliente', err);
        this.snack.open('Erro ao buscar informações do cliente', 'Fechar', { duration: 4000 });
      },
    });
  }

  editarCliente() {
    const payload = {
      nome: String(this.form.get('nome')?.value || ''),
      email: String(this.form.get('email')?.value || ''),
      telefone: String(this.form.get('telefone')?.value || ''),
      cidade: String(this.form.get('cidade')?.value || ''),
    };

  this.clienteService.atualizarCliente(this.idUsuario!, payload as any).subscribe({
      next: (created) => {
        this.snack.open('Cliente atualizado com sucesso', 'Fechar', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('EditarCliente: erro ao atualizar cliente', err);
        this.snack.open('Erro ao atualizar cliente', 'Fechar', { duration: 4000 });
      },
    });
  }

  uploadLogotipo(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.get('logotipo')?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

  this.clienteService.atualizarLogotipoCliente(this.idUsuario!, file).subscribe({
      next: () => {
        this.snack.open('Logotipo atualizado com sucesso', 'Fechar', { duration: 3000 });
      },
      error: (err) => {
        console.error('EditarCliente: erro ao atualizar logotipo', err);
        this.snack.open('Erro ao atualizar logotipo', 'Fechar', { duration: 4000 });
      },
    });
  }

  onAvatarClick(event: Event) {
    event.stopPropagation();
    try {
      this.fileInput?.nativeElement?.click();
    } catch (e) {
      console.warn('file input not available to open', e);
    }
  }

  onAvatarKeydown(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
      event.preventDefault();
      this.onAvatarClick(event);
    }
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
