import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpload } from './modal-upload';

describe('ModalUpload', () => {
  let component: ModalUpload;
  let fixture: ComponentFixture<ModalUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
