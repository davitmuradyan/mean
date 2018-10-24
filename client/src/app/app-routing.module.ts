import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MainComponent } from './main/main.component';
import { AuthGuardService } from './shared/guards/authGuard.service';
import { LoginGuardService } from './shared/guards/loginGuard.service';

const routes: Routes = [
  {path: '', component: AuthLayoutComponent,  children: [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, canActivate:[LoginGuardService]},
    {path: 'login', component: LoginComponent, canActivate:[LoginGuardService]},
    {path: 'main', component: MainComponent, canActivate: [AuthGuardService]}
  ]},
  {path: 'email-verification/:authToken', component: VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
