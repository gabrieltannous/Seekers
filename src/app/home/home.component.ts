import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Job } from '../models/job';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUser: boolean;
  isCompany: boolean;

  job = new Job();
  jobs: any[];
  applied: boolean;
  test1 = 12345678;

  userName: string;
  currentId: string;

  successMessage = null;
  errorMessage = null;
  constructor(
    private authServ: AuthService,
    private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService,
    private route: Router,
    private companyServ: CompanyService,
    private userServ: UserService
  ) {
    this.loader.show();
    this.authServ.isUser().subscribe(res => {
      this.isUser = res['isUser'];
      if (this.isUser) {
        this.updateJobs();
        this.loader.hide();
        this.userName = res['user'].fullName;
        this.currentId = res['user']._id;
      }
    });

    this.authServ.isCompany().subscribe(res => {
      this.isCompany = res['isCompany'];
      if (this.isCompany) {
        this.loader.hide();
        this.userName = res['company'].name;
        this.currentId = res['company']._id;
      }
    });
  }

  ngOnInit() {}

  updateJobs() {
    this.userServ.getJobs().subscribe(res => (this.jobs = res['jobs']));
  }

  fillModal() {
    this.job = new Job();
  }

  addJob() {
    if (this.isCompany) {
      if (this.job.title === undefined || this.job.title === '') {
        this.errorMessage = 'Title cannot be empty';
      } else if (this.job.type === undefined || this.job.type === '') {
        this.errorMessage = 'Type cannot be empty';
      } else if (this.job.salary === undefined || this.job.salary === null) {
        this.errorMessage = 'Salary cannot be empty';
      } else {
        this.loader.show();
        this.job.companyId = this.currentId;
        this.companyServ.addCompanyJob(this.job).subscribe(res => {
          if (res['success']) {
            this.successMessage = res['msg'][0];
            this.errorMessage = null;
          } else {
            this.errorMessage = res['msg'][0];
            this.successMessage = null;
          }
          this.loader.hide();
        });
      }
    }
  }

  apply(job) {
    this.userServ.applyToJob(job).subscribe(() => this.updateJobs());
  }

  logout() {
    this.authServ.logOut();
  }
}
