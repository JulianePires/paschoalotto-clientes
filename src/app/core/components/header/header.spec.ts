import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Header],
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