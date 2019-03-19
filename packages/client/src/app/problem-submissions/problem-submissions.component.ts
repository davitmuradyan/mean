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
    });
  }

}
