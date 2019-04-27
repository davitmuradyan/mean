import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../common-shared/layouts/auth-layout/auth-layout.component';
import { ReviewSubmissionsComponent } from './review-submissions/review-submissions.component';
import { AuthGuardService } from '../common-shared/guards/authGuard.service';
import { AdminGuardService } from '../common-shared/guards/adminGuard.service';
import { ProblemReviewComponent } from './review-submissions/problem-review/problem-review.component';
import { CourseReviewComponent } from './review-submissions/course-review/course-review.component';

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
    {path: 'submissions', component: ReviewSubmissionsComponent, canActivate: [AuthGuardService, AdminGuardService]},
    {path: 'submissions/problem/:_id', component: ProblemReviewComponent, canActivate: [AuthGuardService, AdminGuardService]},
    {path: 'submissions/course/:_id', component: CourseReviewComponent, canActivate: [AuthGuardService, AdminGuardService]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule { }
