import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/company';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css', '../../app.component.css']
})

export class CompanyRegisterComponent implements OnInit {

  company = new Company();
  errorMessage: string;
  successMessage: string;

  constructor( private authService: AuthService, private firebaseService: FirebaseService, private loader: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {

  }

  register(company: NgForm) {
    this.loader.show();
    this.authService.signUpEmail(company.value)
    .then(res => {
      this.firebaseService.addCompany(company.value);
      this.loader.hide();
      window.location.href = '/company/login';
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }

}
