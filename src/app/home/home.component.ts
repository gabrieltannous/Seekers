import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Job } from '../models/job';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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

  constructor(private authState: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService) {
      this.authState.isUser().then(res => { this.isUser = res; });
      this.authState.isCompany().then(res => { this.isCompany = res; });
      this.fireServ.getJobs().snapshotChanges().subscribe(items => {
        this.jobs = items.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return { id, ...data };
        });
        this.jobs.map(c => {
          this.fireServ.haveApplied(c.id, this.authState.currentUserId).valueChanges().subscribe(
            res => {
              if (res.length === 1) {
                c.applied = true;
              } else {
                c.applied = false;
              }
        this.loader.hide();
            }
          );
        });
      });
      // this.jobs = this.fireServ.getAppliedJobs(this.authState.currentUser);
      // this.loader.hide();
  }

  ngOnInit() {
    this.loader.show();
    console.log(this.authState.isLoggedIn());
  }

  addJob(jobForm: NgForm) {
    console.log('inside');
    jobForm.value.companyId = this.authState.currentUserId;
    this.fireServ.addJob(jobForm.value);
  }

  apply(job) {
    this.fireServ.apply(job.id, this.authState.currentUserId);
    job.applied = true;
  }

  logout() {
    this.authState.logout();
  }

}
