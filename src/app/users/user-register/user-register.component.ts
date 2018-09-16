import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css', '../../auth.css'],
  encapsulation: ViewEncapsulation.None
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
    this.authService.signUpEmailUser(user.value)
    .catch(err => {
      console.log(err);
    });
  }

}
