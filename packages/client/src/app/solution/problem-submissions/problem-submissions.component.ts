import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../../shared/services/solution.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-problem-submissions',
  templateUrl: './problem-submissions.component.html',
  styleUrls: ['./problem-submissions.component.scss']
})
export class ProblemSubmissionsComponent implements OnInit {

  solutions$: Subscription;
  pagination = [];

  constructor(private solutionService: SolutionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.solutionService.fetch(params['offset']).subscribe(solutions => {
        this.solutions$ = solutions.solutions;
        const numberOfPages = Math.ceil(solutions.length / 5);
        for (let i = 1; i <= numberOfPages; i++) {
          if (!this.pagination[i - 1]) {
            this.pagination.push({pageNumber: i, active: i === Math.floor(params['offset'] / 5) + 1});
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
  }
}
