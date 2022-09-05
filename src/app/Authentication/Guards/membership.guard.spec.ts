import { TestBed } from '@angular/core/testing';

import { MembershipGuard } from './membership.guard';

describe('MembershipGuard', () => {
  let guard: MembershipGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MembershipGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
