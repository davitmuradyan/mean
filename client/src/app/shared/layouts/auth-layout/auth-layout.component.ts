import { Component, DoCheck, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnDestroy, DoCheck {

  user = null;

  constructor(private authService: AuthService) { }

  ngOnDestroy() {
    this.user = null;
  }

  // TODO: replace this lyfecycle method by more optimized code
  ngDoCheck() {
    this.user = this.authService.isAuthenticated();
  }

}
