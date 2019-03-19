import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MainComponent } from './main/main.component';
import { CoursesComponent } from './courses/courses.component';
import { StatisticsComponent } from './courses/statistics/statistics.component';
import { NumericalComponent } from './courses/numerical/numerical.component';
import { Calc3Component } from './courses/calc3/calc3.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DataStructuresComponent } from './courses/data-structures/data-structures.component';
import { MechanicsComponent } from './courses/mechanics/mechanics.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeaturesComponent } from './features/features.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateSolutionComponent } from './create-solution/create-solution.component';
import { CourseSubmissionsComponent } from './course-submissions/course-submissions.component';
import { ProblemSubmissionsComponent } from './problem-submissions/problem-submissions.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AuthLayoutComponent,
    LoaderComponent,
    VerifyEmailComponent,
    MainComponent,
    CoursesComponent,
    StatisticsComponent,
    NumericalComponent,
    Calc3Component,
    EditProfileComponent,
    DataStructuresComponent,
    MechanicsComponent,
    FeaturesComponent,
    CreateCourseComponent,
    CreateSolutionComponent,
    CourseSubmissionsComponent,
    ProblemSubmissionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
