import {AfterViewInit, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnDestroy, DoCheck {

  user = null;
  image = '';
  isAuth = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnDestroy() {
    this.user = null;
  }

  // TODO: replace this lyfecycle method by more optimized code
  ngDoCheck() {
    this.isAuth = this.authService.isAuthenticated();
    if (this.isAuth) {
      this.user = this.authService.getUser();
      this.image = `http://localhost:3000/${this.user.imgSrc}`;
    } else {
      this.image = '';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
