import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/company';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css', '../../auth.css'],
  encapsulation: ViewEncapsulation.None
})

export class CompanyRegisterComponent implements OnInit {

  company = new Company();
  errorMessage: string = null;

  constructor( private authService: AuthService, private firebaseService: FirebaseService,
    private loader: Ng4LoadingSpinnerService, private route: Router) {
  }

  ngOnInit() {
    this.loader.hide();
  }

  register(company: NgForm) {
    if (company.value.password === company.value.cpassword) {
      this.loader.show();
      this.authService.signUpEmailCompany(company.value)
      .catch(err => {
        this.loader.hide();
        this.errorMessage = err.message;
      });
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }

}
