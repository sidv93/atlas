import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsEvaluateComponent } from './tabs-evaluate.component';

describe('TabsEvaluateComponent', () => {
  let component: TabsEvaluateComponent;
  let fixture: ComponentFixture<TabsEvaluateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsEvaluateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
