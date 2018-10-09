import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.css']
})
export class UserJobsComponent implements OnInit {

  appliedJobs: any[];

  constructor(private authServ: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService, private route: Router) {
      this.fireServ.getUserAppliedJobs(this.authServ.currentUserId).then(res => {
        this.appliedJobs = res;
        this.loader.hide();
      });
    }

  ngOnInit() {
    this.loader.hide();
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/user/login']));
  }

}
