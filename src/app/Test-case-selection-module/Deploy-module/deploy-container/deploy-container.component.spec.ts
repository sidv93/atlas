import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployContainerComponent } from './deploy-container.component';

describe('DeployContainerComponent', () => {
  let component: DeployContainerComponent;
  let fixture: ComponentFixture<DeployContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
