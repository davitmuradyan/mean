import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../../../shared/services/solution.service';
import { Subscription } from 'rxjs';
import { Solution } from '../../../common-shared/interfaces';

@Component({
  selector: 'app-view-solution',
  templateUrl: './view-solution.component.html',
  styleUrls: ['./view-solution.component.scss']
})
export class ViewSolutionComponent implements OnInit, OnDestroy {

  paramsSub$: Subscription;
  solution: Solution;

  constructor(private activatedRoute: ActivatedRoute, private solutionsService: SolutionService) { }

  ngOnInit(): void {
    this.paramsSub$ = this.activatedRoute.params.subscribe(params => {
      this.solutionsService.getSingleSolution(params.id).subscribe(solution => {
        this.solution = solution;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSub$) { this.paramsSub$.unsubscribe(); }
  }

}
