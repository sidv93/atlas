import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionTestComponent } from './progression-test.component';

describe('ProgressionTestComponent', () => {
  let component: ProgressionTestComponent;
  let fixture: ComponentFixture<ProgressionTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressionTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
