import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectPredictionComponent } from './defect-prediction.component';

describe('DefectPredictionComponent', () => {
  let component: DefectPredictionComponent;
  let fixture: ComponentFixture<DefectPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
