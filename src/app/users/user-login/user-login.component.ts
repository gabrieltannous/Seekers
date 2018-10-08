import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user = new User();
  errorMessage: string = null;

  constructor(private authServ: AuthService, private route: Router,
    private loader: Ng4LoadingSpinnerService, private fireServ: FirebaseService) {
    }

  ngOnInit() {
    this.loader.hide();
  }

  signin(user: NgForm) { // log user in
    this.loader.show();
    this.fireServ.getUserByEmail(user.value.email).subscribe(res => {
      if (res.length === 0) {
        this.loader.hide();
        this.errorMessage = 'Account does not exist';
      } else {
        this.authServ.signInEmail(user.value).then(
          () => {
            this.route.navigate(['/home']);
          })
          .catch(err => {
            this.loader.hide();
            this.errorMessage = err.message;
          });
      }
    });
  }

  googleLogin() {
    this.authServ.signInWithGoogle();
  }
}
