import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticAnalysisComponent } from './static-analysis.component';

describe('StaticAnalysisComponent', () => {
  let component: StaticAnalysisComponent;
  let fixture: ComponentFixture<StaticAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
