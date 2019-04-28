import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionRoutingModule } from './solution.routing.module';
import { CommonSharedModule } from '../common-shared/common-shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CreateSolutionComponent } from './create-solution/create-solution.component';
import { ProblemSubmissionsComponent } from './problem-submissions/problem-submissions.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateSolutionComponent,
    ProblemSubmissionsComponent,
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
