import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css', '../app.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  Email: string;
  mailSent: boolean;

  constructor(private authState: AuthService) {
  }

  ngOnInit() {
    this.mailSent = false;
  }

  resetPassword(resetForm: NgForm) {
    this.authState.resetPassword(resetForm.value.email).then(res => {
      this.mailSent = true;
    });
  }

}
