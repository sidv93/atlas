import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPipelinesComponent } from './training-pipelines.component';

describe('TrainingPipelinesComponent', () => {
  let component: TrainingPipelinesComponent;
  let fixture: ComponentFixture<TrainingPipelinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingPipelinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPipelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
