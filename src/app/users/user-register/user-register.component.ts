import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css', '../../app.component.css']
})
export class UserRegisterComponent implements OnInit {

  user = new User();
  errorMessage: string;
  successMessage: string;

  constructor(private authService: AuthService, private firebaseService: FirebaseService,
    private route: Router, private loader: Ng4LoadingSpinnerService) {

    }

  ngOnInit() {

  }

  register(user: NgForm) {
    this.loader.show();
    this.authService.signUpEmail(user.value)
    .then(res => {
      this.firebaseService.addUser(user.value);
      this.loader.hide();
      this.route.navigate(['/user/login']);
      // window.location.href = '/user/login';
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }

}
