import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  wrongEmail = '';
  wrongUsername = '';
  imagePreview: string | ArrayBuffer = '';
  image: File;

  @ViewChild('frame') modalRef: ModalDirective;
  @ViewChild('img') imgRef: ElementRef;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.authService.register(this.form.value)
      .subscribe(() => {
        this.modalRef.show();
      },
      err => console.log(err.error.message));
  }

  onChangeEmail() {
    this.authService.checkUserEmail(this.form.value.email)
    .subscribe(() => {
      this.wrongEmail = '';
    },
    (error) => {
      this.wrongEmail = error.error.message;
    });
  }

  onChangeUsername() {
    this.authService.checkUsername(this.form.value.username)
    .subscribe(() => {
      this.wrongUsername = '';
    },
    (error) => {
      this.wrongUsername = error.error.message;
    });
  }

  // onFileChange(e) {
  //   const reader = new FileReader();
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     this.image = file;
  //     reader.onload = () => {
  //       this.imagePreview = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   console.log(77 )
  //   this.authService.uploadImage(this.image).subscribe((data) => {
  //     console.log(data);
  //   }, (error) => {
  //     console.log(error)
  //   });
  // }

}
