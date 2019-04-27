import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {

  @ViewChild('frame') modalRef: ModalDirective;
  redirectUrl = '';

  constructor(private authService: AuthService, private router: Router) { }

  submit(url): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/${url}`]);
    } else {
      this.modalRef.show();
      this.redirectUrl = url;
    }
  }
}
