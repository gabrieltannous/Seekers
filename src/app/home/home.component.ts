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

  addJob(jobForm: NgForm) {
    if (this.authServ.isCompany()) {
      jobForm.value.companyId = this.authServ.currentUserId;
      this.fireServ.addJob(jobForm.value);
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
