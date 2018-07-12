import { TestBed, inject } from '@angular/core/testing';

import { DateFeatureService } from './date-feature.service';

describe('DateFeatureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateFeatureService]
    });
  });

  it('should be created', inject([DateFeatureService], (service: DateFeatureService) => {
    expect(service).toBeTruthy();
  }));
});
