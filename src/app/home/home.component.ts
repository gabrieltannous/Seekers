import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Job } from '../models/job';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  job = new Job();
  isUser: boolean;
  isCompany: boolean;
  jobs: any[];
  applied: boolean;
  test1 = 12345678;
  successMessage = null;

  constructor(private authServ: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService, private route: Router) {
      this.loader.show();
      this.authServ.isUser().then(res => {
        this.isUser = res;
        if (this.isUser) {
          this.updateJobs();
        }
      });

      this.authServ.isCompany().then(res => {
        this.isCompany = res;
        if (this.isCompany) {
          this.loader.hide();
        }
      });
  }

  ngOnInit() {
  }

  updateJobs() {
    this.fireServ.getUserJobs(this.authServ.currentUserId).then(result => {
      this.jobs = result;
      this.loader.hide();
    });
  }

  addJob() {
    this.loader.show();
    if (this.authServ.isCompany()) {
      this.job.companyId = this.authServ.currentUserId;
      this.fireServ.addJob(this.job).then(() => {
        this.successMessage = 'Job added successfuly';
        this.loader.hide();
      });
    }
  }

  apply(job) {
    this.fireServ.apply(job.$key, this.authServ.currentUserId);
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
