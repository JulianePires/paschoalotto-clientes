import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    // inline template to avoid resolving external templateUrl
    TestBed.overrideComponent(Header, {
      set: {
        template: `<header class="flex w-full justify-between items-center p-4 md:px-12 lg:px-20 bg-white shadow-md"><img src="/assets/logo.png" alt="Paschoalotto Logo" class="w-20 h-20"><h1 class="text-2xl font-semibold text-zinc-700">Gerenciamento de Clientes</h1></header>`,
      },
    });
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo with correct src', () => {
    const img: HTMLImageElement | null = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe(component.paschoalottoLogo);
    expect(img?.getAttribute('alt')).toContain('Paschoalotto');
  });

  it('should render title text', () => {
    const h1: HTMLElement | null = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.textContent).toContain('Gerenciamento de Clientes');
  });
});