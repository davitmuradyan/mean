import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  alert = false;
  message = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.form.value)
     .subscribe((data) => {
        this.authService.storeToken(data);
        this.loading = false;
        this.router.navigate(['/main']);
     },
    (error) => {
      this.loading = false;
      this.alert = true;
      this.message = error.error.message;
    });
  }

}
