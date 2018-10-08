import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nbOfUsers: number;
  nbOfCompanies: number;
  nbOfJobs: number;
  nbOfInterviews: number;

  constructor(private loader: Ng4LoadingSpinnerService, private authServ: AuthService,
    private route: Router, private fireServ: FirebaseService) {
    this.fireServ.getUsersCount().then(res => this.nbOfUsers = res);
    this.fireServ.getCompaniesCount().then(res => this.nbOfCompanies = res);
    this.fireServ.getInterviewsCount().then(res => this.nbOfInterviews = res);
    this.fireServ.getJobsCount().then(res => this.nbOfJobs = res);
  }

  ngOnInit() {
    this.loader.hide();
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/admin']));
  }

}
