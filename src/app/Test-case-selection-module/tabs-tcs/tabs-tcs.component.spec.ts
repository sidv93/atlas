import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsTcsComponent } from './tabs-tcs.component';

describe('TabsTcsComponent', () => {
  let component: TabsTcsComponent;
  let fixture: ComponentFixture<TabsTcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsTcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsTcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
