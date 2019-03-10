import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CoursesService } from '../shared/services/courses.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-course-submissions',
  templateUrl: './course-submissions.component.html',
  styleUrls: ['./course-submissions.component.scss']
})
export class CourseSubmissionsComponent implements OnInit {

  courses$: Subscription;

  constructor(private courseService: CoursesService, private authService: AuthService) { }

  ngOnInit() {
    this.courseService.fetch(true).subscribe(data => {
      this.courses$ = data;
      console.log(data)
    });
  }

}
