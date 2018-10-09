import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../../services/auth.service';
import { Job } from '../../models/job';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: any[];
  job = new Job;

  constructor(private loader: Ng4LoadingSpinnerService, private fireServ: FirebaseService,
    private authServ: AuthService, private route: Router) {
    this.loadJobs();
  }

  loadJobs() {
    return this.fireServ.getAllJobs().then(res => {
      this.jobs = res;
      this.loader.hide();
    });
  }

  ngOnInit() {
  }

  fillModal(job) {
    this.job = job;
  }

  editJob() {
    this.loader.show();
    this.fireServ.updateJob(this.job).then(() => this.loadJobs());
  }

  delete($key) {
    this.loader.show();
    this.fireServ.deleteJob($key).then(() => {
      this.loadJobs().then(() => this.loader.hide());
    });
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/admin']));
  }
}
