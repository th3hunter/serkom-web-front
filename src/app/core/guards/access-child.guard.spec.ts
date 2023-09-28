import { TestBed } from '@angular/core/testing';

import { AccessChildGuard } from './access-child.guard';

describe('AccessChildGuard', () => {
  let guard: AccessChildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessChildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
