import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginGuardService } from '../common-shared/guards/loginGuard.service';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuardService } from '../common-shared/guards/authGuard.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { FeaturesComponent } from './features/features.component';
import { AuthLayoutComponent } from '../common-shared/layouts/auth-layout/auth-layout.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UsersComponent } from './users/users.component';
import { SuperAdminGuard } from '../common-shared/guards/superAdmin.guard';

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
    {path: '', component: HomePageComponent},
    {path: 'register', component: RegisterComponent, canActivate: [LoginGuardService]},
    {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
    {path: 'main', component: MainComponent, canActivate: [AuthGuardService]},
    {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardService]},
    {path: 'users', component: UsersComponent, canActivate: [SuperAdminGuard]},
    {path: 'features', component: FeaturesComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact-us', component: ContactUsComponent},
  ]},
  {path: 'email-verification/:authToken', component: VerifyEmailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
