import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css', '../../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserLoginComponent implements OnInit {

  user = new User();
  loggedIn: boolean;

  constructor(private authServ: AuthService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.loggedIn = this.authServ.isLoggedIn();
  }

  signin(user: NgForm) { // log user in
    this.spinnerService.show();
    this.authServ.signInEmail(user.value)
    .then(res => {
      this.spinnerService.hide();
      this.loggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
    });
  }

  googleLogin() {
    this.spinnerService.show();
    this.authServ.signInWithGoogle()
    .then(res => {
      this.spinnerService.hide();
      this.loggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
    });
  }

  logout() { // log user out
    this.authServ.logout();
    this.loggedIn = false;
  }
}
