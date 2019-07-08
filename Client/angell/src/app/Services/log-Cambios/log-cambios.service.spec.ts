import { TestBed, inject } from '@angular/core/testing';

import { LogCambiosService } from './log-cambios.service';

describe('LogCambiosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogCambiosService]
    });
  });

  it('should be created', inject([LogCambiosService], (service: LogCambiosService) => {
    expect(service).toBeTruthy();
  }));
});
