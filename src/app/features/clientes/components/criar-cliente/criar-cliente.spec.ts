import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCliente } from './criar-cliente';

describe('CriarCliente', () => {
  let component: CriarCliente;
  let fixture: ComponentFixture<CriarCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
