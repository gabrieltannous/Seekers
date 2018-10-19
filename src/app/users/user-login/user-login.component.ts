import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user = new User();
  errorMessage: string = null;

  constructor(
    private route: Router,
    private loader: Ng4LoadingSpinnerService,
    private userServ: UserService
  ) {}

  ngOnInit() {
    this.loader.hide();
  }

  signin(user: NgForm) {
    if (user.value.email === undefined || user.value.email === '') {
      this.errorMessage = 'Please fill email value';
    } else if (
      user.value.password === undefined ||
      user.value.password === ''
    ) {
      this.errorMessage = 'Please fill password value';
    } else {
      this.loader.show();
      this.userServ.signinUser(user.value).subscribe(
        res => {
          if (res['success']) {
            localStorage.setItem('jwtToken', res['token']);
            this.loader.hide();
            this.route.navigate(['/home']);
          } else {
            this.errorMessage = res['msg'];
            this.loader.hide();
          }
        },
        err => console.error(err)
      );
    }
  }
}
