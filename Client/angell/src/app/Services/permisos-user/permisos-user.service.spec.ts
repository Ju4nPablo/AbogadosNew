import { TestBed, inject } from '@angular/core/testing';

import { PermisosUserService } from './permisos-user.service';

describe('PermisosUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermisosUserService]
    });
  });

  it('should be created', inject([PermisosUserService], (service: PermisosUserService) => {
    expect(service).toBeTruthy();
  }));
});
