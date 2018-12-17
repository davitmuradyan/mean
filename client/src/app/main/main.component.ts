import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user;
  image = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.image = `http://localhost:3000/${this.user.imgSrc}`;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

}
