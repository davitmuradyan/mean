import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../shared/services/courses.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Courses } from '../../common-shared/interfaces';

@Component({
  selector: 'app-course-submissions',
  templateUrl: './course-submissions.component.html',
  styleUrls: ['./course-submissions.component.scss']
})
export class CourseSubmissionsComponent implements OnInit, OnDestroy {

  courses: Courses;
  pagination = [];
  coursesSub$: Subscription;
  offset: number;
  disableNext = false;
  disableLast = false;

  constructor(private courseService: CoursesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.coursesSub$ = this.activatedRoute.queryParams.subscribe(params => {
      this.offset = params['offset'];
      this.courseService.getUserCourses(params['offset']).subscribe(data => {
        this.courses = data;
        const numberOfPages = Math.ceil(data.length / 5);
        for (let i = 1; i <= numberOfPages; i++) {
          if (!this.pagination[i - 1]) {
            this.pagination.push({pageNumber: i, active: i === Math.floor(params['offset'] / 5) + 1});
          }
        }
        if (this.pagination.length) {
          if (this.pagination[this.pagination.length - 1].active) {
            this.disableNext = true;
          }
          if (this.pagination[0].active) {
            this.disableLast = true;
          }
        }
      });
    });
  }

  changeActiveState(page): void {
    this.pagination.map(item => {
      item.active = false;
      this.pagination[+page - 1].active = true;
    });
    if (this.pagination[+page - 1].active) {
      this.disableNext = false;
    }
    if (!this.pagination[0].active) {
      this.disableLast = false;
    }
  }

  changeOffset(reverse = false): void {
    const page = this.pagination.find(item => item.active);
    reverse ? this.changeActiveState(page.pageNumber - 1) : this.changeActiveState(page.pageNumber + 1);
    this.router.navigate(
      ['/course', 'submissions'],
      { queryParams: { offset: reverse ? +this.offset - 5 : +this.offset + 5 } }
    );
  }

  ngOnDestroy(): void {
    if (this.coursesSub$) { this.coursesSub$.unsubscribe(); }
  }

}
