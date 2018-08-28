import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserLoginComponent implements OnInit {

  user = new User();
  loggedIn: boolean;

  constructor(private authServ: AuthService) {
    if (this.authServ.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  ngOnInit() {
    if (this.authServ.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  signin(user: NgForm) {
    console.log(user.value);
    this.authServ.signInWithEmail(user.value)
    .then(res => {
      console.log('welcome ' + res);
      this.loggedIn = true;
      window.location.href = '/home';
    }, err => {
      console.log(err);
    });
  }

  logout() {
    this.authServ.logout();
    this.loggedIn = false;
  }

}
