import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../shared/services/courses.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-submissions',
  templateUrl: './course-submissions.component.html',
  styleUrls: ['./course-submissions.component.scss']
})
export class CourseSubmissionsComponent implements OnInit {

  courses$: Subscription;
    pagination = [];

  constructor(private courseService: CoursesService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.courseService.fetch(params['offset']).subscribe(data => {
        this.courses$ = data;
        const numberOfPages = Math.ceil(data.length / 5);
        for (let i = 1; i <= numberOfPages; i++) {
          if (!this.pagination[i - 1]) {
            this.pagination.push({pageNumber: i, active: i === Math.floor(params['offset'] / 5) + 1});
          }
        }
      });
    });
  }

  changeActiveState(page) {
    this.pagination.map(item => {
      item.active = false;
      this.pagination[+page - 1].active = true;
    });
  }

}
