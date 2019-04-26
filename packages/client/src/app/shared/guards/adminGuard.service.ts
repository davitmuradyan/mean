import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { USER_TYPE_ADMIN } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();
    if (user.type !== USER_TYPE_ADMIN) {
      this.router.navigate(['/main']);
      return false;
    }
    return true;
  }
}
