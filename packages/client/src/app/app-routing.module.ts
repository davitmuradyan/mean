import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MainComponent } from './main/main.component';
import { AuthGuardService } from './shared/guards/authGuard.service';
import { LoginGuardService } from './shared/guards/loginGuard.service';
import { CoursesComponent } from './courses/courses.component';
import { StatisticsComponent } from './courses/statistics/statistics.component';
import { NumericalComponent } from './courses/numerical/numerical.component';
import { Calc3Component } from './courses/calc3/calc3.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DataStructuresComponent } from './courses/data-structures/data-structures.component';
import { MechanicsComponent } from './courses/mechanics/mechanics.component';
import { FeaturesComponent } from './features/features.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateSolutionComponent } from './create-solution/create-solution.component';
import { CourseSubmissionsComponent } from './course-submissions/course-submissions.component';
import { ProblemSubmissionsComponent } from './problem-submissions/problem-submissions.component';
import { ProblemReviewComponent } from './review-submissions/problem-review/problem-review.component';
import { ReviewSubmissionsComponent } from './review-submissions/review-submissions.component';
import { AdminGuardService } from './shared/guards/adminGuard.service';
import { CourseReviewComponent } from './review-submissions/course-review/course-review.component';

const routes: Routes = [
  {path: '', component: AuthLayoutComponent,  children: [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, canActivate: [LoginGuardService]},
    {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
    {path: 'main', component: MainComponent, canActivate: [AuthGuardService]},
    {path: 'courses', component: CoursesComponent},
    {path: 'courses/statistics', component: StatisticsComponent},
    {path: 'courses/numerical', component: NumericalComponent},
    {path: 'courses/calc3', component: Calc3Component},
    {path: 'courses/data-structures', component: DataStructuresComponent},
    {path: 'courses/mechanics', component: MechanicsComponent},
    {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardService]},
    {path: 'features', component: FeaturesComponent},
    {path: 'create-course', component: CreateCourseComponent, canActivate: [AuthGuardService]},
    {path: 'create-solution', component: CreateSolutionComponent, canActivate: [AuthGuardService]},
    {path: 'course-submissions', component: CourseSubmissionsComponent, canActivate: [AuthGuardService]},
    {path: 'problem-submissions', component: ProblemSubmissionsComponent, canActivate: [AuthGuardService]},
    {path: 'review-submissions', component: ReviewSubmissionsComponent, canActivate: [AuthGuardService, AdminGuardService]},
    {path: 'review-submissions/problem/:_id', component: ProblemReviewComponent, canActivate: [AuthGuardService, AdminGuardService]},
    {path: 'review-submissions/course/:_id', component: CourseReviewComponent, canActivate: [AuthGuardService, AdminGuardService]},
  ]},
  {path: 'email-verification/:authToken', component: VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
