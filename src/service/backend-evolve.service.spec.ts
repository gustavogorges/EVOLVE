import { TestBed } from '@angular/core/testing';

import { BackendEVOLVEService } from './backend-evolve.service';

describe('BackendEVOLVEService', () => {
  let service: BackendEVOLVEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendEVOLVEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
