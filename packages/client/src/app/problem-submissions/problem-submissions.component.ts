import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../shared/services/solution.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-problem-submissions',
  templateUrl: './problem-submissions.component.html',
  styleUrls: ['./problem-submissions.component.scss']
})
export class ProblemSubmissionsComponent implements OnInit {

  solutions$: Subscription;

  constructor(private solutionService: SolutionService) { }

  ngOnInit() {
    this.solutionService.fetch().subscribe(solutions => {
      this.solutions$ = solutions;
      // Future functions evaluating
      // const sol = new Function(`return ${solutions[5].solution}`);
      // console.log(+sol()([1, 2, 3, 4, 5, 6]).toFixed(2));
    });
  }

}
