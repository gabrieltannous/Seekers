import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user = new User();
  errorMessage: string;
  successMessage: string;

  constructor( private authService: AuthService, private firebaseService: FirebaseService) {
   }

  ngOnInit() {

  }

  register(user: NgForm) {
    this.authService.signUpEmail(user.value)
    .then(res => {
      this.firebaseService.addUser(user.value);
      window.location.href = '/user/login';
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }

}
