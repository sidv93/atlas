import { TestBed, inject } from '@angular/core/testing';

import { EvaluateService } from './evaluate.service';

describe('EvaluateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluateService]
    });
  });

  it('should be created', inject([EvaluateService], (service: EvaluateService) => {
    expect(service).toBeTruthy();
  }));
});
