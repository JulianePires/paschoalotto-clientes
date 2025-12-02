import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoesCliente } from './acoes-cliente';

describe('AcoesCliente', () => {
  let component: AcoesCliente;
  let fixture: ComponentFixture<AcoesCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcoesCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcoesCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
