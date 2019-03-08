import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../shared/services/courses.service';
import { Subscription } from 'rxjs';
import { SolutionService } from '../shared/services/solution.service';

@Component({
  selector: 'app-create-solution',
  templateUrl: './create-solution.component.html',
  styleUrls: ['./create-solution.component.scss']
})
export class CreateSolutionComponent implements OnInit {

  form: FormGroup;
  message: string;
  alertClass: string;
  courses$: Subscription;
  @ViewChild('alert') alert: ElementRef;

  constructor(private courseService: CoursesService, private solutionService: SolutionService) {  }

  ngOnInit() {
    this.courseService.fetch().subscribe(data => {
      this.courses$ = data;
    }, error => console.log(error));
    this.form = new FormGroup({
      courseName: new FormControl(null),
      problem: new FormControl(null, [Validators.required]),
      comments: new FormControl(null),
      functionName: new FormControl(null, [Validators.required]),
      numberOfInputs: new FormControl(null, [Validators.required]),
      parameters: new FormControl(null, [Validators.required]),
      testCaseInput: new FormControl(null, [Validators.required]),
      testCaseOutput: new FormControl(null, [Validators.required]),
      solution: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.solutionService.create(this.form.value).subscribe(courseMessage => {
      this.alertClass = 'success';
      this.message = courseMessage.message;
      this.form.reset();
    }, error => {
      this.alertClass = 'danger';
      this.message = error.error.message;
    });
  }

  closeAlert() {
    this.message = null;
    this.alert.nativeElement.classList.remove('show');
  }

}
