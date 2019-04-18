import { Component, OnDestroy, OnInit } from '@angular/core';
import { SolutionService } from '../../shared/services/solution.service';
import { ActivatedRoute } from '@angular/router';
import { Solution } from '../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-problem-review',
  templateUrl: './problem-review.component.html',
  styleUrls: ['./problem-review.component.scss']
})
export class ProblemReviewComponent implements OnInit, OnDestroy {

  testCasePass: boolean;
  alertMessage = false;
  sub1$: Subscription;
  solution$: Solution;
  functionValue: number;
  editorOptions = {theme: 'vs-dark', language: 'typescript'};
  testCaseClass = '';
  constructor(private solutionService: SolutionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub1$ = this.activatedRoute.params.subscribe(param => {
      this.solutionService.getSingleSolution(param._id).subscribe(solution => {
        this.solution$ = solution;
        console.log(solution)
      });
    });
  }

  testSolution() {
    const sol = new Function(`return ${this.solution$.solution}`);
    this.functionValue = +sol()(this.solution$.testCaseInput[0].split(',')
      .map(item => Number(item)), this.solution$.testCaseInput[1]);
    if (this.functionValue === +this.solution$.testCaseOutput) {
      this.testCaseClass = 'success';
      this.testCasePass = true;
      this.alertMessage = true;
    } else {
      this.testCaseClass = 'danger';
      this.testCasePass = false;
      this.alertMessage = true;
    }
  }

  ngOnDestroy(): void {
    this.sub1$.unsubscribe();
  }

}
