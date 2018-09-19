import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.css']
})
export class UserJobsComponent implements OnInit {

  appliedJobs: any[];

  constructor(private authState: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService) {
      this.appliedJobs = this.fireServ.getAppliedJobs(this.authState.currentUser);
    }

  ngOnInit() {
  }

  logout() {
    this.authState.logout();
  }

}
