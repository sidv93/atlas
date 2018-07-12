import { TestBed, inject } from '@angular/core/testing';

import { ExecutionResultService } from './execution-result.service';

describe('ExecutionResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExecutionResultService]
    });
  });

  it('should be created', inject([ExecutionResultService], (service: ExecutionResultService) => {
    expect(service).toBeTruthy();
  }));
});
