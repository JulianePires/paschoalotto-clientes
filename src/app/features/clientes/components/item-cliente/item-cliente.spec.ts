import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCliente } from './item-cliente';
import { ClientesModule } from '../../clientes-module';

describe('ItemCliente', () => {
  let component: ItemCliente;
  let fixture: ComponentFixture<ItemCliente>;

  beforeEach(async () => {
    TestBed.overrideComponent(ItemCliente, { set: { template: '<div></div>' } });
    await TestBed.configureTestingModule({
      imports: [ItemCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
