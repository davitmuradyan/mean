import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../shared/services/courses.service';
import { Subscription } from 'rxjs';
import { SolutionService } from '../../shared/services/solution.service';

@Component({
  selector: 'app-create-solution',
  templateUrl: './create-solution.component.html',
  styleUrls: ['./create-solution.component.scss']
})
export class CreateSolutionComponent implements OnInit, OnDestroy {

  form: FormGroup;
  message: string;
  alertClass: string;
  courses = [];
  courseSub$: Subscription;
  solCreateSub$: Subscription;
  editorOptions = {theme: 'vs-light', language: 'typescript'};
  loader = true;
  @ViewChild('alert') alert: ElementRef;

  constructor(private courseService: CoursesService, private solutionService: SolutionService) {  }

  ngOnInit(): void {
    this.courseSub$ = this.courseService.fetch()
      .subscribe(data => {
        this.courses = data.courses;
        if (data.courses.length) {
          this.form = new FormGroup({
            courseName: new FormControl(this.courses[0]._id),
            problem: new FormControl(null, [Validators.required]),
            comments: new FormControl(null),
            functionName: new FormControl(null, [Validators.required]),
            numberOfInputs: new FormControl(null, [Validators.required]),
            parameters: new FormControl(null, [Validators.required]),
            testCaseInput: new FormControl(null, [Validators.required]),
            testCaseOutput: new FormControl(null, [Validators.required]),
            solution: new FormControl(null, [Validators.required]),
          });
        } else {
          this.loader = false;
          this.alertClass = 'danger';
          this.message = 'No available courses';
        }
      }, error => console.log(error));
  }

  onSubmit(): void {
    this.solCreateSub$ = this.solutionService.create(this.form.value)
      .subscribe(courseMessage => {
        this.alertClass = 'success';
        this.message = courseMessage.message;
        this.form.reset();
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
    if (this.courseSub$) { this.courseSub$.unsubscribe(); }
    if (this.solCreateSub$) { this.solCreateSub$.unsubscribe(); }
  }

}
