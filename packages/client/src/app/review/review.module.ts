import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewSubmissionsComponent } from './review-submissions/review-submissions.component';
import { CourseReviewComponent } from './review-submissions/course-review/course-review.component';
import { ProblemReviewComponent } from './review-submissions/problem-review/problem-review.component';
import { ReviewRoutingModule } from './review.routing.module';
import { CommonSharedModule } from '../common-shared/common-shared.module';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReviewSubmissionsComponent,
    CourseReviewComponent,
    ProblemReviewComponent,
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    CommonSharedModule,
    MonacoEditorModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    FormsModule,
  ]
})
export class ReviewModule { }
