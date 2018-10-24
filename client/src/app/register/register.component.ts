import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  @ViewChild('frame') modalRef: ModalDirective

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    this.authService.register(this.form.value)
      .subscribe(() => {
        this.modalRef.show()
      },
      err => console.log(err.error.message))
  }

}
