import { TestBed } from '@angular/core/testing';

import { SaveEditsGuard } from './save-edits.guard';

describe('SaveEditsGuard', () => {
  let guard: SaveEditsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SaveEditsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
