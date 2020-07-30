import { TestBed } from '@angular/core/testing';

import { SelectiveLoadingService } from './selective-loading.service';

describe('SelectiveLoadingService', () => {
  let service: SelectiveLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectiveLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
