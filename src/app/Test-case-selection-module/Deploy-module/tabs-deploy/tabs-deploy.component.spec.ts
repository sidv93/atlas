import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDeployComponent } from './tabs-deploy.component';

describe('TabsDeployComponent', () => {
  let component: TabsDeployComponent;
  let fixture: ComponentFixture<TabsDeployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsDeployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
