import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loginSub$: Subscription;
  alert = false;
  loading = false;
  message = '';
  @Input() fromModal: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.loginSub$ = this.authService.login(this.form.value)
     .subscribe((data) => {
        this.authService.storeToken(data);
        this.loading = false;
        this.fromModal ? this.router.navigate([`/${this.fromModal}`]) : this.router.navigate(['/main']);
     },
    (error) => {
      this.loading = false;
      this.alert = true;
      this.message = error.error.message;
    });
  }

  ngOnDestroy(): void {
    if (this.loginSub$) { this.loginSub$.unsubscribe(); }
  }

}
