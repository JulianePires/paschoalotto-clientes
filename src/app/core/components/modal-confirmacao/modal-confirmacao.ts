import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';

export interface DadosModal {
  titulo: string;
  mensagem: string;
  confirmar: () => void;
}

@Component({
  selector: 'app-modal-confirmacao',
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './modal-confirmacao.html',
})
export class ModalConfirmacao {
  readonly dialogRef = inject(MatDialogRef<ModalConfirmacao>);
  readonly data = inject<DadosModal>(MAT_DIALOG_DATA);
  titulo = input<string>('Confirmação');
  mensagem = input<string>('Tem certeza que deseja continuar?');
  confirmar = output<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  aoConfirmar(): void {
    this.confirmar.emit();
    this.dialogRef.close(true);
  }
}
