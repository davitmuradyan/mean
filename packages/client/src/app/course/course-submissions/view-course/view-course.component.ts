import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../shared/services/courses.service';
import { Subscription } from 'rxjs';
import { Course } from '../../../common-shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STATUSES } from '../../../shared/constants';

const { STATUS_PENDING } = STATUSES;

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit, OnDestroy {

  paramsSub$: Subscription;
  updateCourseSub$: Subscription;
  course: Course;
  form: FormGroup;
  alertClass = '';
  message = '';
  @ViewChild('alert') alert;

  constructor(private activatedRoute: ActivatedRoute, private courseService: CoursesService) { }

  ngOnInit(): void {
    this.paramsSub$ = this.activatedRoute.params.subscribe(params => {
      this.courseService.getSingleCourse(params.id).subscribe(course => {
        this.course = course;
        this.form = new FormGroup({
          courseName: new FormControl(this.course.courseName),
          problems: new FormControl(this.course.problems, [Validators.required]),
          needDB: new FormControl(this.course.needDB, [Validators.required]),
          comments: new FormControl(this.course.comments),
          description: new FormControl(null, [Validators.required]),
        });
      });
    });
  }

  onSubmit(): void {
    this.updateCourseSub$ = this.courseService.update({
      _id: this.course._id,
      status: STATUS_PENDING,
      feedback: this.course.feedback,
      ...this.form.value
    })
      .subscribe(course => {
        this.course = course;
        this.alertClass = 'success';
        this.message = 'Course updated successfully.';
      }, error => {
        this.alertClass = 'danger';
        this.message = error.error.message;
      });
  }

  closeAlert(): void {
    this.message = null;
    this.alert.nativeElement.classList.remove('show');
  }

  ngOnDestroy(): void {
    if (this.paramsSub$) { this.paramsSub$.unsubscribe(); }
    if (this.updateCourseSub$) { this.updateCourseSub$.unsubscribe(); }
  }

}
