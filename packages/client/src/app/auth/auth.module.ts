import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MainComponent } from './main/main.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FeaturesComponent } from './features/features.component';
import { CommonSharedModule } from '../common-shared/common-shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    MainComponent,
    EditProfileComponent,
    FeaturesComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonSharedModule,
    MDBBootstrapModule.forRoot(),
  ]
})
export class AuthModule { }
