import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchersComponent } from './dispatchers.component';

describe('DispatchersComponent', () => {
  let component: DispatchersComponent;
  let fixture: ComponentFixture<DispatchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
