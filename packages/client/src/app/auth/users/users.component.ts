import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../common-shared/interfaces';
import { ModalDirective } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[];
  currentUser: User;
  type = '';
  updateSub$: Subscription;
  blockUserSub$: Subscription;
  getUsersSub$: Subscription;

  @ViewChild('frame') frame: ModalDirective;
  @ViewChild('frame1') frame1: ModalDirective;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.getUsersSub$ = this.authService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  openModal(user: User): void {
    this.currentUser = user;
    this.frame.show();
  }

  updatePerm(user: User): void {
    user.type = this.type;
    this.updateSub$ = this.authService.updatePermission(user).subscribe(() => {
      this.frame.hide();
    }, error => {
      console.log(error);
    });
  }

  blockUserModal(user: User): void {
    this.currentUser = user;
    this.frame1.show();
  }

  blockUser(user: User) {
    this.blockUserSub$ = this.authService.blockUser(user).subscribe(() => {
      this.frame1.hide();
      this.fetch();
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    if (this.updateSub$) { this.updateSub$.unsubscribe(); }
    if (this.blockUserSub$) { this.blockUserSub$.unsubscribe(); }
  }

}
