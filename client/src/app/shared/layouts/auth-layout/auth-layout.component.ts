import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {

  user = null

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.isAuthenticated()
    console.log(this.user)
  }

  ngOnDestroy() {
    this.user = null
  }

}
