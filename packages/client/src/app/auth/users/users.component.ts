import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../common-shared/interfaces';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  roles = [
    {name: 'Student', value: 'student'},
    {name: 'Admin', value: 'admin'},
    {name: 'Super Admin', value: 'super-admin'},
  ];
  currentUser: User;

  @ViewChild('frame') frame: ModalDirective;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  openModal(user: User) {
    this.currentUser = user;
    this.frame.show();
  }

  updatePerm(user: User) {
    this.authService.updatePermission(user).subscribe(updatedUser => {
      console.log(updatedUser);
    }, error1 => {
      console.log(error1);
    });
  }

  onChange(role) {
    console.log(role);
  }

}
