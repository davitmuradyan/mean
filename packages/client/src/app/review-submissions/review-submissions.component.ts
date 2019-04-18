import {Component, OnDestroy} from '@angular/core';
import { CoursesService } from '../shared/services/courses.service';
import { SolutionService } from '../shared/services/solution.service';
import { Subscription } from 'rxjs';
import {Courses, Solution} from '../shared/interfaces';

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

  constructor(private coursesService: CoursesService, private solutionsService: SolutionService) { }

  loadCourses() {
    this.sub1$ = this.coursesService.fetch().subscribe(courses => {
      this.courses = courses;
      console.log(courses)
    }, error => {
      console.log(error);
    });
  }

  loadSolutions() {
    this.sub2$ = this.solutionsService.fetch().subscribe(solutions => {
      this.solutions = solutions;
      console.log(solutions)
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    if (this.sub1$) { this.sub1$.unsubscribe(); }
    if (this.sub2$) { this.sub2$.unsubscribe(); }
  }

}