import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SolutionService } from '../../../shared/services/solution.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Solution } from '../../../common-shared/interfaces';
import { Subscription } from 'rxjs';
import { ModalDirective } from 'angular-bootstrap-md';

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
  inputValues = '';
  testCaseClass = '';
  modalType = '';
  modalIcon = '';
  modalTitle = '';
  feedback = '';
  reviewMessage = '';
  @ViewChild('frame') modalRef: ModalDirective;

  constructor(private solutionService: SolutionService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub1$ = this.activatedRoute.params.subscribe(param => {
      this.solutionService.getSingleSolution(param._id).subscribe(solution => {
        this.solution$ = solution;
      });
    });
  }

  testSolution(): void {
    this.inputValues = this.solution$.testCaseInput.toString();
    const sol = new Function(`return ${this.solution$.solution}`);
    this.functionValue = +sol()(...this.solution$.testCaseInput);
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

  accept(): void {
    this.modalType = 'success';
    this.modalIcon = 'check';
    this.modalTitle = 'Accept';
    this.modalRef.show();
  }

  reject(): void {
    this.modalType = 'danger';
    this.modalIcon = 'close';
    this.modalTitle = 'Reject';
    this.modalRef.show();
  }

  submit(): void {
    const {
      _id,
      course,
      name,
      solution,
      userSubmitted,
      parameters,
      numberOfInputs,
      testCaseInput,
      testCaseOutput,
      functionName,
      comments,
    } = this.solution$;
    this.solutionService.update({
      _id, comments, course, name, solution,
      userSubmitted, feedback: this.feedback,
      parameters, numberOfInputs, testCaseInput,
      testCaseOutput, functionName, status: this.modalType === 'success' ? 'approved' : 'rejected' }).subscribe(
        sol => {
        this.solution$ = sol;
        this.modalRef.hide();
        window.scroll(0, 0);
        this.reviewMessage = 'Your review submitted successfully';
        setTimeout(() => {
          this.router.navigate(['/review/submissions']);
        }, 1500);
    }, error => {
      this.reviewMessage = 'Something went wrong';
    });
  }

  ngOnDestroy(): void {
    this.sub1$.unsubscribe();
  }

}
