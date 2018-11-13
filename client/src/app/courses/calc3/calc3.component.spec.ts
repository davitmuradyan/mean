import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Calc3Component } from './calc3.component';

describe('Calc3Component', () => {
  let component: Calc3Component;
  let fixture: ComponentFixture<Calc3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Calc3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Calc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
