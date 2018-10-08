import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css', '../../app.component.css']
})
export class CompanyProfileComponent implements OnInit {

  company: Company = new Company();
  updated: boolean;
  numberOfJobs: number;
  numberOfApplicants: number;
  numberOfInterviews: number;

  constructor(private authServ: AuthService, public fireServ: FirebaseService,
    private loader: Ng4LoadingSpinnerService, private route: Router) {
    this.updated = false;
    this.fireServ.getCompany(this.authServ.currentUserId).then(
      res => {
        this.company = res;
        this.loader.hide();
    });
  }

  ngOnInit() {
  }

  updateProfile(profileForm: NgForm) {
    this.loader.show();
    this.fireServ.updateCompany(profileForm.value).then(
      res => {
        this.loader.hide();
        this.updated = true;
      }
    );
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/company/login']));
  }

}
