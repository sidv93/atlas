import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateContainerComponent } from './evaluate-container.component';

describe('EvaluateContainerComponent', () => {
  let component: EvaluateContainerComponent;
  let fixture: ComponentFixture<EvaluateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
