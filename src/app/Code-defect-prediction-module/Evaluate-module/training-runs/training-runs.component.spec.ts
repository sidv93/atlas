import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRunsComponent } from './training-runs.component';

describe('TrainingRunsComponent', () => {
  let component: TrainingRunsComponent;
  let fixture: ComponentFixture<TrainingRunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
