import { TestBed, inject } from '@angular/core/testing';

import { CaptchasService } from './captchas.service';

describe('CaptchasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaptchasService]
    });
  });

  it('should be created', inject([CaptchasService], (service: CaptchasService) => {
    expect(service).toBeTruthy();
  }));
});
