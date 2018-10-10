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
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user = new User();
  errorMessage: string = null;

  constructor(private authService: AuthService, private firebaseService: FirebaseService,
    private route: Router, private loader: Ng4LoadingSpinnerService) {

    }

  ngOnInit() {
    this.loader.hide();
  }

  register(user: NgForm) {
    if (user.value.fname === '' || user.value.fname === undefined || user.value.emai === '' || user.value.email === undefined) {
      this.errorMessage = 'Please fill all fields';
    } else {
      if (user.value.password === user.value.cpassword) {
        this.loader.show();
        this.authService.signUpEmailUser(user.value)
        .catch(err => {
          this.errorMessage = err.message;
          this.loader.hide();
        });
      } else {
        this.errorMessage = 'Passwords do not match';
      }
    }
  }

}
