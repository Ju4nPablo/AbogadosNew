import { TestBed, inject } from '@angular/core/testing';

import { AbogadoService } from './abogado.service';

describe('AbogadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbogadoService]
    });
  });

  it('should be created', inject([AbogadoService], (service: AbogadoService) => {
    expect(service).toBeTruthy();
  }));
});
