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

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private loader: Ng4LoadingSpinnerService,
    private route: Router,
    private companyServ: CompanyService
  ) {}

  ngOnInit() {
    this.loader.hide();
  }

  register(company: NgForm) {
    if (
      company.value.name === '' ||
      company.value.name === undefined ||
      company.value.email === '' ||
      company.value.email === undefined ||
      company.value.password === '' ||
      company.value.password === undefined ||
      company.value.cpassword === '' ||
      company.value.cpassword === undefined
    ) {
      this.errorMessage = 'Please fill all fields';
    } else {
      if (company.value.password === company.value.cpassword) {
        this.loader.show();
        this.companyServ.signupCompany(company.value).subscribe(
          res => {
            if (res['success']) {
              this.companyServ.signinCompany(company.value).subscribe(
                res2 => {
                  if (res2['success']) {
                    localStorage.setItem('jwtToken', res2['token']);
                    this.loader.hide();
                    this.route.navigate(['/home']);
                  } else {
                    this.errorMessage = 'Automatic login failed';
                    this.loader.hide();
                  }
                },
                err => console.log(err)
              );
            } else {
              this.errorMessage = res['msg'][0];
              this.loader.hide();
            }
          },
          err => console.log(err)
        );
      } else {
        this.errorMessage = 'Passwords do not match';
      }
    }
  }
}
