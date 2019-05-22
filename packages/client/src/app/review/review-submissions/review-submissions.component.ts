import { Component, OnDestroy } from '@angular/core';
import { CoursesService } from '../../shared/services/courses.service';
import { SolutionService } from '../../shared/services/solution.service';
import { Subscription } from 'rxjs';
import { Courses, Solution } from '../../common-shared/interfaces';
import { STATUSES } from '../../shared/constants/index';
import { ActivatedRoute, Router } from '@angular/router';

const { STATUS_PENDING } = STATUSES;

@Component({
  selector: 'app-review-submissions',
  templateUrl: './review-submissions.component.html',
  styleUrls: ['./review-submissions.component.scss']
})
export class ReviewSubmissionsComponent implements OnDestroy {

  sub1$: Subscription;
  sub2$: Subscription;
  courses: Courses;
  solutions: Solution[];

  constructor(
    private coursesService: CoursesService,
    private solutionsService: SolutionService,
    ) { }

  loadCourses(): void {
      this.sub1$ = this.coursesService.getReviewCourses().subscribe(courses => {
        this.courses = courses;
      }, error => {
        console.log(error);
      });
  }

  loadSolutions(): void {
    this.sub2$ = this.solutionsService.getReviewSolutions().subscribe(solutions => {
      this.solutions = solutions.solutions.filter(solution => solution.status === STATUS_PENDING);
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    if (this.sub1$) { this.sub1$.unsubscribe(); }
    if (this.sub2$) { this.sub2$.unsubscribe(); }
  }

}
