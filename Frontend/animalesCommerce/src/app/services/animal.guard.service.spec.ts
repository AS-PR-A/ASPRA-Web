import { TestBed } from '@angular/core/testing';

import { AnimalGuard } from './animal.guard';

describe('AnimalGuardTs', () => {
  let service: AnimalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
