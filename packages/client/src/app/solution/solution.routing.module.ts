import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSolutionComponent } from './create-solution/create-solution.component';
import { AuthGuardService } from '../common-shared/guards/authGuard.service';
import { ProblemSubmissionsComponent } from './problem-submissions/problem-submissions.component';
import { AuthLayoutComponent } from '../common-shared/layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
    {path: 'create', component: CreateSolutionComponent, canActivate: [AuthGuardService]},
    {path: 'submissions', component: ProblemSubmissionsComponent, canActivate: [AuthGuardService]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolutionRoutingModule { }
