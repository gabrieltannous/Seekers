import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Job } from '../../models/job';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {

  job = new Job();
  jobs: any[];
  allJobs: any[];

  constructor(private authServ: AuthService, private route: Router, private fireServ: FirebaseService,
    private loader: Ng4LoadingSpinnerService) {
      this.loader.hide();
      this.fireServ.getUserJobs(this.authServ.currentUserId).then(
        res => {
          this.allJobs = res;
        }
      );
  }

  ngOnInit() {
  }

  search() {
    this.loader.show();
    this.fireServ.searchJobs(this.allJobs, this.job.title, this.job.type, this.job.salary, this.authServ.currentUserId).then(res => {
      this.jobs = res;
      this.loader.hide();
    });
  }

  apply(job) {
    this.fireServ.apply(job.$key, this.authServ.currentUserId);
    job.applied = true;
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['user/login']));
  }

}
