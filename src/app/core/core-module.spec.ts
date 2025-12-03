import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { CoreModule } from './core-module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './services/loader.interceptor';

describe('CoreModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
    });
  });

  it('should register LoaderInterceptor as an HTTP_INTERCEPTOR', () => {
    const interceptors = TestBed.inject(HTTP_INTERCEPTORS) as any[];
    expect(interceptors).toBeDefined();
    const hasLoader = interceptors.some(i => i instanceof LoaderInterceptor);
    expect(hasLoader).toBeTruthy();
  });
});
