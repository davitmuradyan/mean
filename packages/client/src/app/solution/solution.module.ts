import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionRoutingModule } from './solution.routing.module';
import { CommonSharedModule } from '../common-shared/common-shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CreateSolutionComponent } from './create-solution/create-solution.component';
import { ProblemSubmissionsComponent } from './problem-submissions/problem-submissions.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewSolutionComponent } from './problem-submissions/view-solution/view-solution.component';
import { GuideComponent } from './guide/guide.component';

@NgModule({
  declarations: [
    CreateSolutionComponent,
    ProblemSubmissionsComponent,
    ViewSolutionComponent,
    GuideComponent,
  ],
  imports: [
    CommonModule,
    SolutionRoutingModule,
    CommonSharedModule,
    MDBBootstrapModule.forRoot(),
    MonacoEditorModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class SolutionModule { }
