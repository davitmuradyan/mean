import { Component, DoCheck, OnDestroy } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnDestroy, DoCheck {

  user = null;
  image = '';
  isAuth = false;
  courses = [
    { route: ['/course', 'statistics'], name: 'Statistics' },
    { route: ['/course', 'numerical'], name: 'Numerical Analysis' },
    { route: ['/course', 'calc3'], name: 'Calculus 3' },
    { route: ['/course', 'data-structures'], name: 'Data structures' },
    { route: ['/course', 'mechanics'], name: 'Mechanics' },
  ];
  dropdownLinks = [
    { name: 'Course submissions', route: ['/course', 'submissions'], queryParam: { offset: '0' } },
    { name: 'Problem submissions', route: ['/solution', 'submissions'], queryParam: { offset: '0' } },
  ];
  navLinks = [
    { name: 'Home', route: ['/main'] },
    { name: 'Features', route: ['/features'] },
    { name: 'Courses', route: ['/course'] }
  ];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnDestroy() {
    this.user = null;
  }

  // TODO: replace this lyfecycle method by more optimized code
  ngDoCheck() {
    this.isAuth = this.authService.isAuthenticated();
    if (this.isAuth) {
      this.user = this.authService.getUser();
      this.image = `http://localhost:3000/${this.user.imgSrc || 'uploads/placeholder.png'}`;
    } else {
      this.image = '';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
