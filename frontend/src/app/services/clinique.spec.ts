import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CliniqueService } from './clinique';

describe('CliniqueService', () => {
  let service: CliniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CliniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
