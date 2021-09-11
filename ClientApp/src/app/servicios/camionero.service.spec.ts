import { TestBed } from '@angular/core/testing';

import { CamioneroService } from './camionero.service';

describe('CamioneroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CamioneroService = TestBed.get(CamioneroService);
    expect(service).toBeTruthy();
  });
});
