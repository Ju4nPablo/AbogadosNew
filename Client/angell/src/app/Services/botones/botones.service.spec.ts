import { TestBed, inject } from '@angular/core/testing';

import { BotonesService } from './botones.service';

describe('BotonesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BotonesService]
    });
  });

  it('should be created', inject([BotonesService], (service: BotonesService) => {
    expect(service).toBeTruthy();
  }));
});
