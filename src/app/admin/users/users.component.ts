import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[];
  user = new User;

  constructor(private loader: Ng4LoadingSpinnerService, private fireServ: FirebaseService,
    private authServ: AuthService, private route: Router) {
      this.loadUsers();
  }

  loadUsers() {
    return this.fireServ.getAllUsers().then(res => {
      this.users = res;
      this.loader.hide();
    });
  }

  ngOnInit() {
  }

  fillModal(user) {
    this.user = user;
  }

  editUser() {
    this.loader.show();
    this.fireServ.updateUser(this.user).then(() => this.loadUsers());
  }

  delete($key) {
    this.loader.show();
    this.fireServ.deleteUser($key).then(() => {
      this.loadUsers().then(() => this.loader.hide());
    });
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/admin']));
  }
}
