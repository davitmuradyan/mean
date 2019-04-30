import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSolutionComponent } from './view-solution.component';

describe('ViewSolutionComponent', () => {
  let component: ViewSolutionComponent;
  let fixture: ComponentFixture<ViewSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
