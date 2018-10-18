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
    private loader: Ng4LoadingSpinnerService, private fireServ: FirebaseService,private companyServ: CompanyService) {

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
    this.companyServ.signinCompany(company.value).subscribe(
                      res => {
                        if(res["success"]){
                            localStorage.setItem('jwtToken', res["token"]);
                            this.loader.hide();
                            this.route.navigate(['/home']);
                        }else{
                          this.errorMessage = res["msg"];
                          this.loader.hide();
                        }
                      },err => console.log(err)
    );

    }
  }
}
