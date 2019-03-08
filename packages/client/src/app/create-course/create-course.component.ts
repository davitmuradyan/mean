import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CoursesService } from '../shared/services/courses.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  form: FormGroup;
  message: string;
  alertClass: string;
  @ViewChild('alert') alert: ElementRef;

  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      courseName: new FormControl(null, [Validators.required]),
      problems: new FormControl(null, [Validators.required]),
      needDB: new FormControl(true, [Validators.required]),
      comments: new FormControl(null),
    });
  }

  onSubmit() {
    this.courseService.create(this.form.value).subscribe(courseMessage => {
      this.alertClass = 'success';
      this.message = courseMessage.message;
      this.form.reset();
    }, error => {
      this.alertClass = 'danger';
      this.message = error.error.message;
    });
  }

  closeAlert() {
    this.message = null;
    this.alert.nativeElement.classList.remove('show');
  }

}
