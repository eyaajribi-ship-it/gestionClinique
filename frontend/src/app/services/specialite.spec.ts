import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SpecialiteService } from './specialite';

describe('SpecialiteService', () => {
  let service: SpecialiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SpecialiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
