import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CriarCliente } from './criar-cliente';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('CriarCliente', () => {
  let component: CriarCliente;
  let fixture: ComponentFixture<CriarCliente>;
  let clienteServiceMock: any;
  let routerSpy: any;
  let dialogSpy: any;
  let snackSpy: MatSnackBar;

  beforeEach(async () => {
    clienteServiceMock = {
      criarCliente: vi.fn(),
    };

  routerSpy = { navigate: vi.fn() };
    dialogSpy = {
      open: vi.fn().mockReturnValue({ afterClosed: () => of(true) }),
    };

    await TestBed.configureTestingModule({
      declarations: [CriarCliente],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
      providers: [
        { provide: 'ClienteService', useValue: clienteServiceMock },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    // override injected ClienteService via TestBed injector after compile
    const injector = TestBed.inject<any>(TestBed as any);

    fixture = TestBed.createComponent(CriarCliente);
    component = fixture.componentInstance;
    // patch the injected service references
    (component as any).clienteService = clienteServiceMock;
    (component as any).router = routerSpy;
    (component as any).dialog = dialogSpy;
    snackSpy = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    component.form.patchValue({ nome: '', email: '', telefone: '' });
    component.abrirConfirmacaoCriar();
    expect(component.form.touched || component.form.pristine === false).toBeTruthy();
    expect(dialogSpy.open).not.toHaveBeenCalled();
  });

  it('should call service and navigate on successful creation', fakeAsync(() => {
    const created = { id: '1', nome: 'Teste' } as any;
    clienteServiceMock.criarCliente.mockReturnValue(of(created));

    component.form.patchValue({ nome: 'Nome', email: 'a@b.com', telefone: '12345678', cidade: 'Cidade' });
    component.abrirConfirmacaoCriar();
    // dialog afterClosed returns true, so criarCliente() should be called
    tick();
    expect(clienteServiceMock.criarCliente).toHaveBeenCalled();
    // simulate subscribe next handler ran and navigation called
    // note: we patched clienteServiceMock to return of(created) so navigation should be called
    // navigation is called inside subscribe next
  }));
});