import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimiseContainerComponent } from './optimise-container.component';

describe('OptimiseContainerComponent', () => {
  let component: OptimiseContainerComponent;
  let fixture: ComponentFixture<OptimiseContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptimiseContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimiseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
