import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render author name', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Juliane Pires');
  });

  it('should render "Desenvolvido por" text', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Desenvolvido por');
  });
});