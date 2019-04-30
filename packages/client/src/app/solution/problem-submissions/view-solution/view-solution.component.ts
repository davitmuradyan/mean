import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../../../shared/services/solution.service';
import { Subscription } from 'rxjs';
import { Courses, Solution } from '../../../common-shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STATUSES } from '../../../shared/constants';
import { CoursesService } from '../../../shared/services/courses.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

const { STATUS_PENDING } = STATUSES;

@Component({
  selector: 'app-view-solution',
  templateUrl: './view-solution.component.html',
  styleUrls: ['./view-solution.component.scss']
})
export class ViewSolutionComponent implements OnInit, OnDestroy {

  paramsSub$: Subscription;
  updateSolutionSub$: Subscription;
  solution: Solution;
  form: FormGroup;
  alertClass = '';
  message = '';
  editorOptions = {theme: 'vs-light', language: 'typescript'};
  courses: Courses;
  @ViewChild('alert') alert;

  constructor(private activatedRoute: ActivatedRoute, private solutionsService: SolutionService, private courseService: CoursesService) { }

  ngOnInit(): void {
    this.paramsSub$ = this.activatedRoute.params.subscribe(params => {
      this.updateSolutionSub$ = forkJoin(
        this.courseService.fetch(),
        this.solutionsService.getSingleSolution(params.id),
      ).pipe(
        map(([courses, solution]) => {
          return { courses, solution };
        }),
      ).subscribe(data => {
        const { courses, solution } = data;
        this.courses = courses;
        this.solution = solution;
        const courseIdx = this.courses.courses.findIndex(item => item._id === this.solution.course);
        this.form = new FormGroup({
          course: new FormControl(this.courses.courses[courseIdx]._id),
          problem: new FormControl(this.solution.name, [Validators.required]),
          comments: new FormControl(this.solution.comments),
          functionName: new FormControl(this.solution.functionName, [Validators.required]),
          numberOfInputs: new FormControl(this.solution.numberOfInputs, [Validators.required]),
          parameters: new FormControl(this.solution.parameters, [Validators.required]),
          testCaseInput: new FormControl(this.solution.testCaseInput, [Validators.required]),
          testCaseOutput: new FormControl(this.solution.testCaseOutput, [Validators.required]),
          solution: new FormControl(this.solution.solution, [Validators.required]),
        });
      }, error => {
        this.alertClass = 'danger';
        this.message = error.error.message;
      });
    });
  }

  onSubmit(): void {
    this.updateSolutionSub$ = this.solutionsService.update({
      _id: this.solution._id,
      status: STATUS_PENDING,
      feedback: this.solution.feedback,
      ...this.form.value
    })
      .subscribe(solution => {
        this.solution = solution;
        this.alertClass = 'success';
        this.message = 'Solution updated successfully.';
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
    if (this.updateSolutionSub$) { this.updateSolutionSub$.unsubscribe(); }
  }

}
