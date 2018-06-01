import { TestBed, inject } from '@angular/core/testing';

import { ErrorHandleService } from './error-handle.service';

describe('ErrorHandleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandleService]
    });
  });

  it('should be created', inject([ErrorHandleService], (service: ErrorHandleService) => {
    expect(service).toBeTruthy();
  }));
});
