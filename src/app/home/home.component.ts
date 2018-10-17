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

  ngOnInit() {
  }

  updateJobs() {
    this.jobServ.GetJobs().subscribe(data => console.log(data));
    this.loader.hide();

    // this.fireServ.getUserJobs(this.authServ.currentUserId).then(result => {
    //   this.jobs = result;
    // });
  }

  fillModal() {
    this.job = new Job();
  }

  addJob() {
    if (this.authServ.isCompany()) {
      if (this.job.title === undefined || this.job.title === '') {
        this.errorMessage = 'Title cannot be empty';
      } else if (this.job.type === undefined || this.job.type === '') {
        this.errorMessage = 'Type cannot be empty';
      } else if (this.job.salary === undefined || this.job.salary === null) {
        this.errorMessage = 'Salary cannot be empty';
      } else {
      // this.loader.show();
        this.job.companyId = this.authServ.currentUserId;
        this.job.mode = 'Save';
        this.jobServ.saveJob(this.job).subscribe(res => alert(res));
        // this.fireServ.addJob(this.job).then(() => {
        //   this.successMessage = 'Job added successfuly';
        //   this.errorMessage = null;
        //   this.loader.hide();
        // });
      }
    }
  }

  apply(job) {
    // this.fireServ.apply(job.$key, this.authServ.currentUserId);
    const apply = new Apply;
    apply.jobId = job._id;
    apply.userId = this.authServ.currentUserId;
    this.jobServ.apply(apply);
    this.updateJobs();
  }

  logout() {
    if (this.isUser) {
      this.authServ.logout().then(() => this.route.navigate(['/user/login']));
    } else {
      this.authServ.logout().then(() => this.route.navigate(['/company/login']));
    }
  }

}
