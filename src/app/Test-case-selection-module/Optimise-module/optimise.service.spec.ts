import { TestBed, inject } from '@angular/core/testing';

import { OptimiseService } from './optimise.service';

describe('OptimiseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptimiseService]
    });
  });

  it('should be created', inject([OptimiseService], (service: OptimiseService) => {
    expect(service).toBeTruthy();
  }));
});
