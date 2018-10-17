import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user = new User();
  errorMessage: string = null;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private route: Router,
    private loader: Ng4LoadingSpinnerService,
    private userServ: UserService
  ) {}

  ngOnInit() {
    this.loader.hide();
  }

  edit = function(kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.address = kk.address;
    this.valbutton = 'Update';
  };

  delete = function(id) {
    this.newService.deleteUser(id).subscribe(
      data => {
        alert(data.data);
        this.ngOnInit();
      },
      error => (this.errorMessage = error)
    );
  };

  register(user: NgForm) {
    this.userServ.createUser(user.value).subscribe(
      res => {
        if (res[0]) {
          this.errorMessage = res[0].msg;
        } else {
          this.loader.show();
          this.authService.signUpEmailUser(user.value).catch(err => {
            this.errorMessage = err.message;
            this.loader.hide();
          });
        }
      },
      err => console.log(err)
    );
  }
}
