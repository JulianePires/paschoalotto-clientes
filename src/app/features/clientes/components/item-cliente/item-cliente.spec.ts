import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCliente } from './item-cliente';

describe('ItemCliente', () => {
  let component: ItemCliente;
  let fixture: ComponentFixture<ItemCliente>;

  beforeEach(async () => {
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
