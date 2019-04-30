import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { StatisticsComponent } from './courses/statistics/statistics.component';
import { NumericalComponent } from './courses/numerical/numerical.component';
import { Calc3Component } from './courses/calc3/calc3.component';
import { DataStructuresComponent } from './courses/data-structures/data-structures.component';
import { MechanicsComponent } from './courses/mechanics/mechanics.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { AuthGuardService } from '../common-shared/guards/authGuard.service';
import { CourseSubmissionsComponent } from './course-submissions/course-submissions.component';
import { AuthLayoutComponent } from '../common-shared/layouts/auth-layout/auth-layout.component';
import { ViewCourseComponent } from './course-submissions/view-course/view-course.component';

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
    {path: '', component: CoursesComponent},
    {path: 'statistics', component: StatisticsComponent},
    {path: 'numerical', component: NumericalComponent},
    {path: 'calc3', component: Calc3Component},
    {path: 'data-structures', component: DataStructuresComponent},
    {path: 'mechanics', component: MechanicsComponent},
    {path: 'create', component: CreateCourseComponent, canActivate: [AuthGuardService]},
    {path: 'submissions', component: CourseSubmissionsComponent, canActivate: [AuthGuardService]},
    {path: 'submissions/:id', component: ViewCourseComponent, canActivate: [AuthGuardService]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule { }
