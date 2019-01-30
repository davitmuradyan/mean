import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  form: FormGroup;
  image: File;
  imagePreview;
  user: User;
  profileUpdated = false;
  loading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.form = new FormGroup({
      firstname: new FormControl(this.user.firstname, [Validators.required]),
      lastname: new FormControl(this.user.lastname, [Validators.required]),
      username: new FormControl(this.user.username, [Validators.required]),
    });
  }

  onFileChange(e) {
    const reader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      this.image = file;
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.authService.editProfile(this.form.value, this.image)
      .subscribe((user) => {
        this.loading = true;
        this.authService.updateLocalStorage(user);
        this.profileUpdated = true;
        this.loading = false;
        setTimeout(() => {
          this.profileUpdated = false;
        }, 2000)
      }, (error) => {
        console.log(error);
      });
  }

}
