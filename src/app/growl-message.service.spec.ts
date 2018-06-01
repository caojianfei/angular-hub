import { TestBed, inject } from '@angular/core/testing';

import { GrowlMessageService } from './growl-message.service';

describe('GrowlMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrowlMessageService]
    });
  });

  it('should be created', inject([GrowlMessageService], (service: GrowlMessageService) => {
    expect(service).toBeTruthy();
  }));
});
