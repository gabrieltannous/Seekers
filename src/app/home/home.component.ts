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
  errorMessage = null;
  userName: string;

  constructor(private authServ: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService, private route: Router) {
      // alert("home");
      this.loader.show();
      // this.authServ.isUser().then(res => {
      //   this.isUser = res;
      //   if (this.isUser) {
      //     this.updateJobs();
      //     this.fireServ.getUser(this.authServ.currentUserId).then(user => this.userName = user.fullName);
      //   }
      // });

      this.authServ.isCompany().subscribe(res => {
         this.isCompany = res["isCompany"];
         if(this.isCompany){
             this.loader.hide();
             this.userName = res["company"].name;
         }
      });
  }

  ngOnInit() {
  }

  updateJobs() {
    // this.fireServ.getUserJobs(this.authServ.currentUserId).then(result => {
    //   this.jobs = result;
    //   this.loader.hide();
    // });
  }

  fillModal() {
    // this.job = new Job();
  }

  addJob() {
    // if (this.authServ.isCompany()) {
    //   if (this.job.title === undefined || this.job.title === '') {
    //     this.errorMessage = 'Title cannot be empty';
    //   } else if (this.job.type === undefined || this.job.type === '') {
    //     this.errorMessage = 'Type cannot be empty';
    //   } else if (this.job.salary === undefined || this.job.salary === null) {
    //     this.errorMessage = 'Salary cannot be empty';
    //   } else {
    //   this.loader.show();
    //     this.job.companyId = this.authServ.currentUserId;
    //     this.fireServ.addJob(this.job).then(() => {
    //       this.successMessage = 'Job added successfuly';
    //       this.errorMessage = null;
    //       this.loader.hide();
    //     });
    //   }
    // }
  }

  apply(job) {
    // this.fireServ.apply(job.$key, this.authServ.currentUserId);
    // this.updateJobs();
  }

  logout() {
    this.authServ.logOut();
    if (this.isCompany) {
      this.route.navigate(['/company/login']);
    } 
  }

}
