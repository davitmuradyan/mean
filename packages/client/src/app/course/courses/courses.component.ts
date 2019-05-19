import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../shared/services/courses.service';
import { Subscription } from 'rxjs';
import { Courses } from '../../common-shared/interfaces';
import { STATUSES } from '../../shared/constants';

const { STATUS_APPROVED } = STATUSES;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  fetchSub$: Subscription;
  courses: Courses;

  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.fetchSub$ = this.courseService.fetch().subscribe(data => {
      this.courses = data;
      this.courses.courses = this.courses.courses.filter(course => course.status === STATUS_APPROVED);
    }, err => {
      console.log(err);
    });
  }
}
