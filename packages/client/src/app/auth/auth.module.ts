import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MainComponent } from './main/main.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FeaturesComponent } from './features/features.component';
import { CommonSharedModule } from '../common-shared/common-shared.module';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    MainComponent,
    EditProfileComponent,
    FeaturesComponent,
    AboutComponent,
    ContactUsComponent,
    UsersComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonSharedModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
  ]
})
export class AuthModule { }
