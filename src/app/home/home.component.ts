import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Job } from '../models/job';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { JobService } from '../services/job.service';
import { Apply } from '../models/apply';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  job = new Job();
  isUser: any;
  isCompany: any;
  jobs;
  applied: boolean;
  successMessage = null;
  errorMessage = null;
  userName: string;

  constructor(private authServ: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService, private route: Router, private userServ: UserService,
    private jobServ: JobService, private companyServ: CompanyService) {
      this.loader.show();
      this.userServ.isUser(this.authServ.currentUser.email).subscribe(res => {
        this.isUser = res;
        if (this.isUser) {
          this.updateJobs();
          this.userServ.GetUser(this.authServ.currentUser).subscribe(user => {
            this.userName = user['fullName'];
          });
        }
      });

      if (!this.isUser) {
        this.companyServ.isCompany(this.authServ.currentUser.email).subscribe(res => {
          this.isCompany = res;
          if (this.isCompany) {
            this.loader.hide();
            this.companyServ.GetCompany(this.authServ.currentUser).subscribe(company => {
              this.userName = company['name'];
            });
          }
        });
      }
  }

  ngOnInit() {
  }

  updateJobs() {
    this.jobServ.GetAppliedJobs(this.authServ.currentUserId).subscribe(data => this.jobs = data);
    this.loader.hide();
  }

  fillModal() {
    this.job = new Job();
  }

  addJob() {
    this.job.companyId = this.authServ.currentUserId;
    this.job.mode = 'Save';
    this.jobServ.saveJob(this.job).subscribe(res => alert(res));
  }

  apply(job) {
    this.jobServ.apply(job._id, this.authServ.currentUserId).subscribe(() => this.updateJobs());

  }

  logout() {
    if (this.isUser) {
      this.authServ.logout().then(() => this.route.navigate(['/user/login']));
    } else {
      this.authServ.logout().then(() => this.route.navigate(['/company/login']));
    }
  }

}
