import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CoursesService } from '../../shared/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../shared/interfaces';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-course-review',
  templateUrl: './course-review.component.html',
  styleUrls: ['./course-review.component.scss']
})
export class CourseReviewComponent implements OnInit, OnDestroy {

  sub1$: Subscription;
  sub2$: Subscription;
  course: Course;
  modalType = '';
  modalIcon = '';
  modalTitle = '';
  feedback = '';

  @ViewChild('frame') modalRef: ModalDirective;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub1$ = this.activatedRoute.params.subscribe(param => {
      this.coursesService.getSingleCourse(param._id).subscribe(course => {
        this.course = course;
        console.log(course);
      }, error => {

      });
    });
  }

  accept() {
    this.modalType = 'success';
    this.modalIcon = 'check';
    this.modalTitle = 'Accept';
    this.modalRef.show();
  }

  reject() {
    this.modalType = 'danger';
    this.modalIcon = 'close';
    this.modalTitle = 'Reject';
    this.modalRef.show();
  }

  submit() {
    const { _id, comments, needDB, problems, courseName, userCreated } = this.course;
    this.coursesService.update({
      _id, comments, needDB, problems,
      courseName, feedback: this.feedback,
      userCreated, status: this.modalType === 'success' ? 'approved' : 'rejected' }).subscribe(course => {
        this.course = course;
    }, error => {
        console.log(error);
    });
  }

  ngOnDestroy(): void {
    if (this.sub1$) { this.sub1$.unsubscribe(); }
    if (this.sub2$) { this.sub2$.unsubscribe(); }
  }

}
