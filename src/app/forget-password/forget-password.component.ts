import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css', '../app.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  Email: string;
  successMessage: string = null;
  errorMessage: string = null;

  constructor(private authServ: AuthService, private route: Router, private loader: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.loader.hide();
  }

  resetPassword(resetForm: NgForm) {
    this.loader.show();
    this.authServ.resetPassword(resetForm.value.email).then(res => {
      this.successMessage = 'A reset link has been sent. Please check your email.';
      this.errorMessage = null;
      this.loader.hide();
    })
    .catch(err => {
      this.successMessage = null;
      this.errorMessage = err.message;
      this.loader.hide();
    });
  }

}
