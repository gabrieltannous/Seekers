import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FirebaseService } from '../../services/firebase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user = new User();
  errorMessage: string = null;

  constructor(private authServ: AuthService, private route: Router, private userServ: UserService,
    private loader: Ng4LoadingSpinnerService, private fireauServ: FirebaseService) {
    }

  ngOnInit() {
    this.loader.hide();
  }

  signin(user: NgForm) { // log user in
    if (user.value.password === undefined) {
      this.errorMessage = 'Please enter a Password';
    } else {
    this.userServ.AuthUser(user.value).subscribe(
      res => {
        if (res && res[0]) {
          this.errorMessage = res[0].msg;
        } else {
          this.loader.show();
          this.authServ.signInEmail(user.value).then(
            () => {
              this.route.navigate(['/home']);
            })
            .catch(err => {
              this.loader.hide();
              this.errorMessage = err.message;
            });
        }
      },
      err => console.log(err)
    );
    }
  }

  googleLogin() {
    this.authServ.signInWithGoogle();
  }
}
