import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MainComponent } from './main/main.component';
import { AuthGuardService } from './shared/guards/authGuard.service';
import { LoginGuardService } from './shared/guards/loginGuard.service';
import {CoursesComponent} from "./courses/courses.component";
import {StatisticsComponent} from "./courses/statistics/statistics.component";
import {NumericalComponent} from "./courses/numerical/numerical.component";
import {Calc3Component} from "./courses/calc3/calc3.component";

const routes: Routes = [
  {path: '', component: AuthLayoutComponent,  children: [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, canActivate:[LoginGuardService]},
    {path: 'login', component: LoginComponent, canActivate:[LoginGuardService]},
    {path: 'main', component: MainComponent, canActivate: [AuthGuardService]},
    {path: 'courses', component: CoursesComponent},
    {path: 'courses/statistics', component: StatisticsComponent},
    {path: 'courses/numerical', component: NumericalComponent},
    {path: 'courses/calc3', component: Calc3Component},
  ]},
  {path: 'email-verification/:authToken', component: VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
