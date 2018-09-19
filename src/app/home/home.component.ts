import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Job } from '../models/job';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  job = new Job();
  isUser: boolean;
  jobsCollection: AngularFirestoreCollection<Job>;
  jobs: any[];
  applied: boolean;

  constructor(private authState: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService, public afs: AngularFirestore) {
      this.loader.show();
      this.authState.isUser().then(res => { this.isUser = res; });
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
            }
          );
        });
        this.loader.hide();
      });
  }

  ngOnInit() {

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
