import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Interview } from '../../models/interview';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.css']
})

export class JobApplicantsComponent implements OnInit {

  jobId: string;
  applicants: any[];
  interview = new Interview();
  errorMessage: string = null;
  successMessage: string = null;

  constructor(private router: ActivatedRoute, private authServ: AuthService, private route: Router,
    private fireServ: FirebaseService, private loader: Ng4LoadingSpinnerService) {
    this.jobId = this.router.snapshot.paramMap.get('id');
    this.interview.jobId = this.jobId;
    this.interview.companyId = this.authServ.currentUserId;
    this.loadApplicants();
  }

  loadApplicants() {
    this.fireServ.getApplicants(this.jobId).then(res => {
      this.applicants = res;
      this.loader.hide();
    });
  }

  ngOnInit() {
    this.loader.hide();
  }

  fillModal(user) {
    this.interview.userId = user.$key;
    this.errorMessage = null;
    this.successMessage = null;
    this.interview.date = new Date(Date.now());
  }

  setInterview() {
    if (this.interview.date === undefined) {
      this.errorMessage = 'Date and time cannot be null';
    } else if (new Date(Date.now()) > this.interview.date) {
      this.errorMessage = 'Interview cannot be in the past';
    } else {
      this.loader.show();
      this.fireServ.setInterview(this.interview).then(
        () => {
          this.successMessage = 'Interview has been set';
          this.loadApplicants();
      });
    }
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/company/login']));
  }

}
