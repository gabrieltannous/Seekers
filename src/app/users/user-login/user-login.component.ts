import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css', '../../auth.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserLoginComponent implements OnInit {

  user = new User();
  loggedIn: boolean;
  wrongAuth: boolean;

  constructor(private authServ: AuthService, private router: Router,
    private loader: Ng4LoadingSpinnerService, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.loggedIn = this.authServ.isLoggedIn();
  }

  signin(user: NgForm) { // log user in
    this.loader.show();
    this.authServ.signInEmail(user.value)
    .then(res => {
      this.wrongAuth = !this.authServ.isLoggedIn();
      this.router.navigate(['/home']);
    }, err => {
      this.wrongAuth = true;
    })
    .catch(error => {
      console.log(error);
      this.wrongAuth = true;
    });
  }

  async googleLogin() {
    this.loader.show();
    this.authServ.signInWithGoogle()
    .then(res => {
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
