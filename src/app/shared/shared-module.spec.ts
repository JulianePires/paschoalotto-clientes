import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { SharedModule } from './shared-module';
import { ClienteService } from './services/cliente.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SharedModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
    });
  });

  it('should provide ClienteService', () => {
    const service = TestBed.inject(ClienteService);
    expect(service).toBeTruthy();
  });
});
