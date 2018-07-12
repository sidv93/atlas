import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsExploreComponent } from './tabs-explore.component';

describe('TabsExploreComponent', () => {
  let component: TabsExploreComponent;
  let fixture: ComponentFixture<TabsExploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsExploreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
