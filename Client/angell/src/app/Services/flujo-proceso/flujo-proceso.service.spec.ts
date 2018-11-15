import { TestBed, inject } from '@angular/core/testing';

import { FlujoProcesoService } from './flujo-proceso.service';

describe('FlujoProcesoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlujoProcesoService]
    });
  });

  it('should be created', inject([FlujoProcesoService], (service: FlujoProcesoService) => {
    expect(service).toBeTruthy();
  }));
});
