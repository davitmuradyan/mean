import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  accessToken = ''

  constructor(
    private authService: AuthService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.authService.verifyEmail(params['authToken']).subscribe(
        (data) => {
          this.authService.storeToken(data)
          this.router.navigate(['/main'])
        },
        error => {
         console.log(error) 
        }
      )
    })
  }

}
