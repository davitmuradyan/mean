import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../../shared/services/solution.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-problem-submissions',
  templateUrl: './problem-submissions.component.html',
  styleUrls: ['./problem-submissions.component.scss']
})
export class ProblemSubmissionsComponent implements OnInit {

  solutions$: Subscription;
  pagination = [];
  offset: number;
  disableNext = false;
  disableLast = false;

  constructor(private solutionService: SolutionService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.offset = params['offset'];
      this.solutionService.fetch(params['offset']).subscribe(solutions => {
        this.solutions$ = solutions;
        const numberOfPages = Math.ceil(solutions.length / 5);
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
        // Future functions evaluating
        // const sol = new Function(`return ${solutions[5].solution}`);
        // console.log(+sol()([1, 2, 3, 4, 5, 6]).toFixed(2));
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
      ['/solution', 'submissions'],
      { queryParams: { offset: reverse ? +this.offset - 5 : +this.offset + 5 } }
    );
  }
}
