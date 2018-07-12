import { TestBed, inject } from '@angular/core/testing';

import { PreprocesseedService } from './preprocesseed.service';

describe('PreprocesseedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreprocesseedService]
    });
  });

  it('should be created', inject([PreprocesseedService], (service: PreprocesseedService) => {
    expect(service).toBeTruthy();
  }));
});
