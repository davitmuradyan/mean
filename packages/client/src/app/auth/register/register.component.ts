import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  wrongEmail = '';
  wrongUsername = '';
  image: File;
  registerSub$: Subscription;
  checkEmailSub$: Subscription;
  checkUsernameSub$: Subscription;

  @ViewChild('frame') modalRef: ModalDirective;
  @ViewChild('img') imgRef: ElementRef;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    this.registerSub$ = this.authService.register(this.form.value)
      .subscribe(() => {
        this.modalRef.show();
      },
      err => console.log(err.error.message));
  }

  onChangeEmail(): void {
    this.checkEmailSub$ = this.authService.checkUserEmail(this.form.value.email)
      .subscribe(() => {
        this.wrongEmail = '';
      },
    (error) => {
      this.wrongEmail = error.error.message;
    });
  }

  onChangeUsername(): void {
    this.checkUsernameSub$ = this.authService.checkUsername(this.form.value.username)
    .subscribe(() => {
      this.wrongUsername = '';
    },
    (error) => {
      this.wrongUsername = error.error.message;
    });
  }

  ngOnDestroy(): void {
    if (this.registerSub$) { this.registerSub$.unsubscribe(); }
    if (this.checkEmailSub$) { this.checkEmailSub$.unsubscribe(); }
    if (this.checkUsernameSub$) { this.checkUsernameSub$.unsubscribe(); }
  }

}
