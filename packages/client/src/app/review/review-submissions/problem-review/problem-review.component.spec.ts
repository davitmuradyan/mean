import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSubmissionComponent } from './problem-review.component';

describe('ProblemSubmissionComponent', () => {
  let component: ProblemSubmissionComponent;
  let fixture: ComponentFixture<ProblemSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
