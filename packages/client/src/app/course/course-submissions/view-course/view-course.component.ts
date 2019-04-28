import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../shared/services/courses.service';
import { Subscription } from 'rxjs';
import { Course } from '../../../common-shared/interfaces';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit, OnDestroy {

  paramsSub$: Subscription;
  course: Course;

  constructor(private activatedRoute: ActivatedRoute, private courseService: CoursesService) { }

  ngOnInit(): void {
    this.paramsSub$ = this.activatedRoute.params.subscribe(params => {
      this.courseService.getSingleCourse(params.id).subscribe(course => {
        this.course = course;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSub$) { this.paramsSub$.unsubscribe(); }
  }

}
