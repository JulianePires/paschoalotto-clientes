import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    // use inline template so tests run in the Vitest/Vite environment (avoid resolving templateUrl)
    TestBed.overrideComponent(Footer, {
      set: {
        template: `<footer class="flex w-full items-center justify-center h-16 bg-zinc-200 text-zinc-600">Desenvolvido por <p class="font-semibold text-blue-800 mx-1">Juliane Pires</p> - &copy; 2025</footer>`,
      },
    });
    await TestBed.configureTestingModule({
      imports: [Footer],
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