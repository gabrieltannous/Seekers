import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/company';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

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
    private loader: Ng4LoadingSpinnerService, private route: Router, private companyServ: CompanyService) {
  }

  ngOnInit() {
    this.loader.hide();
  }

  register(company: NgForm) {
    this.companyServ.createCompany(company.value).subscribe(
      res => {
        if (res[0]) {
          this.errorMessage = res[0].msg;
        } else {
          this.loader.show();
          this.authService.signUpEmailUser(company.value).catch(err => {
            this.errorMessage = err.message;
            this.loader.hide();
          });
        }
      },
      err => console.log(err)
    );
  }

}
