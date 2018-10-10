import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { UserJob } from '../../models/user-job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-jobs',
  templateUrl: './users-jobs.component.html',
  styleUrls: ['./users-jobs.component.css']
})
export class UsersJobsComponent implements OnInit {

  jobs: UserJob[];
  job = new UserJob;
  successMessage: string = null;
  errorMessage: string = null;

  constructor(private authServ: AuthService, private fireServ: FirebaseService,
    private loader: Ng4LoadingSpinnerService, private route: Router) {
      this.loadJobs();
    }

    loadJobs() {
      this.fireServ.getuj(this.authServ.currentUserId).then( res => {
        this.jobs = res;
        this.loader.hide();
      });
    }

  ngOnInit() {
    this.loader.hide();
  }

  fillModal() {
    this.job = new UserJob();
  }

  addJob() {
    if (this.authServ.isCompany()) {
      if (this.job.title === undefined || this.job.title === '') {
        this.errorMessage = 'Title cannot be empty';
      } else if (this.job.details === undefined || this.job.details === '') {
        this.errorMessage = 'Details cannot be empty';
      } else {
      this.loader.show();
        this.job.userId = this.authServ.currentUserId;
        this.fireServ.addUserJob(this.job).then(() => {
          this.successMessage = 'Job added successfuly';
          this.errorMessage = null;
          this.loader.hide();
        });
      }
    }
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/user/login']));
  }

}
