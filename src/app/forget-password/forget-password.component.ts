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
  mailSent: boolean;

  constructor(private authState: AuthService, private route: Router, private loader: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.mailSent = false;
  }

  resetPassword(resetForm: NgForm) {
    this.loader.show();
    this.authState.resetPassword(resetForm.value.email).then(res => {
      this.loader.hide();
      this.route.navigate(['/home']);
    });
  }

}
