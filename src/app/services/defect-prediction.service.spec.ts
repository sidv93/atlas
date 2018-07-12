import { TestBed, inject } from '@angular/core/testing';

import { DefectPredictionService } from './defect-prediction.service';

describe('DefectPredictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefectPredictionService]
    });
  });

  it('should be created', inject([DefectPredictionService], (service: DefectPredictionService) => {
    expect(service).toBeTruthy();
  }));
});
