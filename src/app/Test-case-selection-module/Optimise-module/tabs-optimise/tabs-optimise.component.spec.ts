import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsOptimiseComponent } from './tabs-optimise.component';

describe('TabsOptimiseComponent', () => {
  let component: TabsOptimiseComponent;
  let fixture: ComponentFixture<TabsOptimiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsOptimiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsOptimiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
