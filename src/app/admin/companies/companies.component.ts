import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/company';
import { FirebaseService } from '../../services/firebase.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: any[];
  company = new Company;

  constructor(private loader: Ng4LoadingSpinnerService, private fireServ: FirebaseService,
    private authServ: AuthService, private route: Router) {
    this.loadCompanies();
  }

  loadCompanies() {
    return this.fireServ.getAllCompanies().then(res => {
      this.companies = res;
      this.loader.hide();
    });
  }

  ngOnInit() {
  }

  fillModal(company) {
    this.company = company;
  }

  editCompany() {
    this.loader.show();
    this.fireServ.updateCompany(this.company).then(() => this.loadCompanies());
  }

  delete($key) {
    this.loader.show();
    this.fireServ.deleteCompany($key).then(() => {
      this.loadCompanies().then(() => this.loader.hide());
    });
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/admin']));
  }
}
