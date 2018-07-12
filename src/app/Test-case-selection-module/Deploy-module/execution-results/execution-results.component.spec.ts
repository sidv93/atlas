import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionResultsComponent } from './execution-results.component';

describe('ExecutionResultsComponent', () => {
  let component: ExecutionResultsComponent;
  let fixture: ComponentFixture<ExecutionResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
