import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../../../shared/services/solution.service';
import { Solutions } from '../../../common-shared/interfaces';

@Component({
  selector: 'app-dynamic-course',
  templateUrl: './dynamic-course.component.html',
  styleUrls: ['./dynamic-course.component.scss']
})
export class DynamicCourseComponent implements OnInit {

  solutions: Solutions;
  solutionsMap = new Map();
  constructor(private activatedRoute: ActivatedRoute, private solutionsService: SolutionService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.solutionsService.getSolutionsByCourse(params.id).subscribe(solutions => {
        this.solutions = solutions;
        for (const sol of solutions.solutions) {
          this.solutionsMap.set(sol.name, sol.solution);
        }
      });
    });
  }

  convertFunc(solution) {
    const sol = this.solutionsMap.get(solution.name);
    const a = new Function(`return ${sol}`);
    solution.testCaseOutput = a()(solution.testCaseInput);
  }

}
