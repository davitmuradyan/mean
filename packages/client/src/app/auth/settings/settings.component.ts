import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  form: FormGroup;
  passwordUpdated = false;
  loading = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [this.confirmValidator]),
    });
  }

  confirmValidator = (control: FormControl) => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  onSubmit() {
    this.loading = true;
    this.authService.changePassword(this.form.value)
      .subscribe(() => {
        this.loading = false;
        this.passwordUpdated = true;
        this.form.reset();
      }, error => {
        this.loading = false;
      });
  }
}
