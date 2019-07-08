import { TestBed, inject } from '@angular/core/testing';

import { ListaCombosService } from './lista-combos.service';

describe('ListaCombosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListaCombosService]
    });
  });

  it('should be created', inject([ListaCombosService], (service: ListaCombosService) => {
    expect(service).toBeTruthy();
  }));
});
