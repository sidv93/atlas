import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcsContainerComponent } from './tcs-container.component';

describe('TcsContainerComponent', () => {
  let component: TcsContainerComponent;
  let fixture: ComponentFixture<TcsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
