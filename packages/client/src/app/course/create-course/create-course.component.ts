import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../shared/services/courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit, OnDestroy {

  form: FormGroup;
  message: string;
  alertClass: string;
  createCourseSub$: Subscription;
  @ViewChild('alert') alert: ElementRef;

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      courseName: new FormControl(null, [Validators.required]),
      problems: new FormControl(null, [Validators.required]),
      needDB: new FormControl(true, [Validators.required]),
      comments: new FormControl(null),
    });
  }

  onSubmit(): void {
    this.createCourseSub$ = this.courseService.create(this.form.value)
      .subscribe(courseMessage => {
        this.alertClass = 'success';
        this.message = courseMessage.message;
        this.form.reset();
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
    if (this.createCourseSub$) { this.createCourseSub$.unsubscribe(); }
  }

}
