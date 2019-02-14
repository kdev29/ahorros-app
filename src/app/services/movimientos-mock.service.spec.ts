import { TestBed } from '@angular/core/testing';

import { MovimientosMockService } from './movimientos-mock.service';

describe('MovimientosMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovimientosMockService = TestBed.get(MovimientosMockService);
    expect(service).toBeTruthy();
  });
});
