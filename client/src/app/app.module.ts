import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MainComponent } from './main/main.component';
import {CoursesComponent} from "./courses/courses.component";
import {StatisticsComponent} from "./courses/statistics/statistics.component";
import {NumericalComponent} from "./courses/numerical/numerical.component";
import {Calc3Component} from "./courses/calc3/calc3.component";

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
    Calc3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
