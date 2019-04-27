import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSubmissionsComponent } from './problem-submissions.component';

describe('ProblemSubmissionsComponent', () => {
  let component: ProblemSubmissionsComponent;
  let fixture: ComponentFixture<ProblemSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
