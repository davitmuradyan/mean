import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseRoutingModule } from './course.routing.module';
import { CoursesComponent } from './courses/courses.component';
import { StatisticsComponent } from './courses/statistics/statistics.component';
import { NumericalComponent } from './courses/numerical/numerical.component';
import { Calc3Component } from './courses/calc3/calc3.component';
import { DataStructuresComponent } from './courses/data-structures/data-structures.component';
import { MechanicsComponent } from './courses/mechanics/mechanics.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CourseSubmissionsComponent } from './course-submissions/course-submissions.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonSharedModule } from '../common-shared/common-shared.module';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    CoursesComponent,
    StatisticsComponent,
    NumericalComponent,
    Calc3Component,
    DataStructuresComponent,
    MechanicsComponent,
    CreateCourseComponent,
    CourseSubmissionsComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    CommonSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule,
    ClipboardModule,
  ]
})
export class CourseModule { }
