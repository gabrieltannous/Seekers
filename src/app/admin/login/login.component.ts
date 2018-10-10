import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../../services/auth.service';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../auth.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = null;
  admin = new Admin();

  constructor(private route: Router, private loader: Ng4LoadingSpinnerService, private authServ: AuthService) {

  }

  ngOnInit() {
    this.loader.hide();
  }

  login(admin: NgForm) {
    if (admin.value.email === undefined || admin.value.email === '') {
      this.errorMessage = 'Please fill email value';
    } else if (admin.value.password === undefined || admin.value.password === '') {
      this.errorMessage = 'Please fill password value';
    } else {
      this.loader.show();
      if (this.authServ.isAdminEmail(admin.value.email)) {
        this.authServ.signInEmail(admin.value)
        .then(res => {
          if (res !== undefined) {
            this.route.navigate(['/admin/dashboard']);
          }
        })
        .catch(err => {
          this.loader.hide();
          this.errorMessage = err.message;
        });
      } else {
          this.errorMessage = 'Admin account does not exist';
          this.loader.hide();
      }
    }
  }
}
