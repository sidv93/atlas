import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDifferenceComponent } from './file-difference.component';

describe('FileDifferenceComponent', () => {
  let component: FileDifferenceComponent;
  let fixture: ComponentFixture<FileDifferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDifferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
