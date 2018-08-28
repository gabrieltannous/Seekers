import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {

  company = new Company();
  loggedIn: boolean;

  constructor(private authServ: AuthService) {
    if (this.authServ.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  ngOnInit() {
    if (this.authServ.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  signin(company: NgForm) {
    console.log(company.value);
    this.authServ.signInEmail(company.value)
    .then(res => {
      console.log('welcome ' + res);
      this.loggedIn = true;
      window.location.href = '/home';
    }, err => {
      console.log(err);
    });
  }

  logout() {
    this.authServ.logout();
    this.loggedIn = false;
  }

}
