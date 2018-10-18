import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/company';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FirebaseService } from '../../services/firebase.service';
import { CompanyService } from 'src/app/services/company.service';

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
    private loader: Ng4LoadingSpinnerService, private companyServ: CompanyService) {

  }

  ngOnInit() {
    this.loader.hide();
  }

  signin(company: NgForm) {
    if (company.value.password === undefined) {
      this.errorMessage = 'Please enter a Password';
    } else {
    this.companyServ.GetCompany(company.value).subscribe(
      res => {
        if (res && res[0]) {
          this.errorMessage = res[0].msg;
        } else {
          this.loader.show();
          this.authServ.signInEmail(company.value).then(
            () => {
              this.route.navigate(['/home']);
            })
            .catch(err => {
              this.loader.hide();
              this.errorMessage = err.message;
            });
        }
      },
      err => console.log(err)
    );
    }
  }
}
