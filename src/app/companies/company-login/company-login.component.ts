import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/company';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css', '../../auth.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyLoginComponent implements OnInit {

  company = new Company();
  errorMessage: string = null;

  constructor(private authServ: AuthService, private route: Router,
    private loader: Ng4LoadingSpinnerService, private fireServ: FirebaseService) {

  }

  ngOnInit() {
    this.loader.hide();
  }

  signin(company: NgForm) {
    if (company.value.email === undefined || company.value.email === '') {
      this.errorMessage = 'Please fill email value';
    } else if (company.value.password === undefined || company.value.password === '') {
      this.errorMessage = 'Please fill password value';
    } else {
    this.loader.show();
    this.fireServ.getCompanyByEmail(company.value.email).subscribe(res => {
      if (res.length === 0) {
        this.loader.hide();
        this.errorMessage = 'User does not exist';
      } else {
        this.authServ.signInEmail(company.value).then(
          () => {
            this.route.navigate(['/home']);
          })
          .catch(err => {
            this.loader.hide();
            this.errorMessage = err.message;
          });
      }
    });
  }
  }
}
