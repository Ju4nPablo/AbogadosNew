import { TestBed, inject } from '@angular/core/testing';

import { CasoService } from './caso.service';

describe('CasoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CasoService]
    });
  });

  it('should be created', inject([CasoService], (service: CasoService) => {
    expect(service).toBeTruthy();
  }));
});
