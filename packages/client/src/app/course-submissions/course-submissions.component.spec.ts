import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubmissionsComponent } from './course-submissions.component';

describe('CourseSubmissionsComponent', () => {
  let component: CourseSubmissionsComponent;
  let fixture: ComponentFixture<CourseSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
