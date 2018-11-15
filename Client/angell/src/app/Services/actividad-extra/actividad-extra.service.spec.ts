import { TestBed, inject } from '@angular/core/testing';

import { ActividadExtraService } from './actividad-extra.service';

describe('ActividadExtraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActividadExtraService]
    });
  });

  it('should be created', inject([ActividadExtraService], (service: ActividadExtraService) => {
    expect(service).toBeTruthy();
  }));
});
