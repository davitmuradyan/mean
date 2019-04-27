import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TrimPipe } from './pipes/trim.pipe';
import { AddSpacePipe } from './pipes/add-space.pipe';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    TrimPipe,
    AddSpacePipe,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    RouterModule,
  ],
  exports: [
    TrimPipe,
    AddSpacePipe,
    LoaderComponent,
    AuthLayoutComponent,
  ]
})
export class CommonSharedModule { }
