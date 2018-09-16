import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Job } from '../models/job';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  job = new Job();
  isUser: boolean;
  showIt: boolean;
  jobsCollection: AngularFirestoreCollection<Job>;
  jobs: any[];

  constructor(private authState: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService, public afs: AngularFirestore) {
  }

  ngOnInit() {
    this.loader.show();
    this.authState.isUser().then(res => { this.isUser = res; });
    this.showIt = false;
    this.fireServ.getJobs().subscribe(items => {
      this.jobs = items;
      this.loader.hide();
    });
  }

  addJob(jobForm: NgForm) {
    console.log('inside');
    jobForm.value.companyId = this.authState.currentUserId;
    this.fireServ.addJob(jobForm.value);
  }

  apply(item) {
    console.log(item);
  }

  logout() {
    this.authState.logout();
  }

}
