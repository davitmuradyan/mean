import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../../../shared/services/solution.service';
import { Course, Solutions } from '../../../common-shared/interfaces';
import { forkJoin, Subscription } from 'rxjs';
import { StatService } from '../../../shared/services/stat.service';
import { CoursesService } from '../../../shared/services/courses.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-course',
  templateUrl: './dynamic-course.component.html',
  styleUrls: ['./dynamic-course.component.scss']
})
export class DynamicCourseComponent implements OnInit {

  solutions: Solutions;
  hidden = false;
  canSaveDataset = false;
  canUpdateDataset = false;
  solutionsMap = new Map();
  dataSetToSave;
  message = '';
  course: Course;
  datasets = [];

  updateSub$: Subscription;
  removeSub$: Subscription;
  fetchSub$: Subscription;
  createSub$: Subscription;
  @ViewChild('newData') newDatasetRef: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private solutionsService: SolutionService,
    private statService: StatService,
    private courseService: CoursesService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      forkJoin(
        this.courseService.getSingleCourse(params['id']),
        this.solutionsService.getSolutionsByCourse(params['id']),
        this.statService.fetch(params['id'])
      ).pipe(
        map(([course, solutions, datasets]) => {
          return { course, solutions, datasets };
        }),
      ).subscribe(data => {
        const { course, solutions, datasets } = data;
        this.solutions = solutions;
        for (const sol of solutions.solutions) {
          this.solutionsMap.set(sol.name, sol.solution);
        }
        this.course = course;
        datasets.map(set => {
          set.editMode = false;
          this.datasets.push(set);
        });
      });
    });
  }

  convertFunc(solution) {
    const sol = this.solutionsMap.get(solution.name);
    const a = new Function(`return ${sol}`);
    solution.testCaseOutput = a()(...solution.testCaseInput);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  showHide(): void {
    this.hidden = !this.hidden;
  }

  fetch(): void {
    this.datasets = [];
    console.log(this.course)
    this.fetchSub$ = this.statService.fetch(this.course._id)
      .subscribe((data) => {
        data.map(set => {
          set.editMode = false;
          this.datasets.push(set);
        });
      }, error => {
        console.log(error);
      });
  }

  remove(id): void {
    this.removeSub$ = this.statService.remove(id)
      .subscribe(() => {
        this.fetch();
      }, error => {
        console.log(error);
      });
  }

  edit(dataset) {
    dataset.editMode = !dataset.editMode;
  }

  update(dataset): void {
    const newDataset = this.newDatasetRef.nativeElement.value.split(',').map(Number);
    this.updateSub$ = this.statService.update(dataset._id, newDataset)
      .subscribe((data) => {
        this.fetch();
        this.message = '';
      }, (error) => {
        this.message = error.error.message;
        console.log(error);
      });
  }

  save(): void {
    const dataset = this.dataSetToSave.split(',').map(Number);
    this.createSub$ = this.statService.create(dataset, this.course._id)
      .subscribe(data => {
        this.fetch();
        this.dataSetToSave = null;
        this.message = '';
      }, error => {
        this.message = error.error.message;
        console.log(error);
      });
  }

  onKeyUp(event: Event): void {
    const commaSeparatedRegExp = /^\w+(,\w+)*$/;
    this.canSaveDataset = commaSeparatedRegExp.test(this.dataSetToSave);
    if (this.newDatasetRef) {
      this.canUpdateDataset = commaSeparatedRegExp.test(this.newDatasetRef.nativeElement.value);
    }
  }

}
