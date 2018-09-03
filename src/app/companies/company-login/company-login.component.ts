import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/company';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css', '../../app.component.css']
})
export class CompanyLoginComponent implements OnInit {

  company = new Company();
  loggedIn: boolean;

  constructor(private authServ: AuthService, private route: Router, private loader: Ng4LoadingSpinnerService) {

  }

  ngOnInit() {
    this.loggedIn = this.authServ.isLoggedIn();
  }

  signin(company: NgForm) {
    this.loader.show();
    this.authServ.signInEmail(company.value)
    .then(res => {
      this.loggedIn = true;
      this.loader.hide();
      this.route.navigate(['/home']);
    }, err => {
      console.log(err);
    });
  }

  logout() {
    this.authServ.logout();
    this.loggedIn = false;
  }

}
