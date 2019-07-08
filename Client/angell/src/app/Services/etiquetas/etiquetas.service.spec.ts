import { TestBed, inject } from '@angular/core/testing';

import { EtiquetasService } from './etiquetas.service';

describe('EtiquetasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtiquetasService]
    });
  });

  it('should be created', inject([EtiquetasService], (service: EtiquetasService) => {
    expect(service).toBeTruthy();
  }));
});
