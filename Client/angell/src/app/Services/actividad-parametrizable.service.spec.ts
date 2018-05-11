import { TestBed, inject } from '@angular/core/testing';

import { ActividadParametrizableService } from './actividad-parametrizable.service';

describe('ActividadParametrizableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActividadParametrizableService]
    });
  });

  it('should be created', inject([ActividadParametrizableService], (service: ActividadParametrizableService) => {
    expect(service).toBeTruthy();
  }));
});
