import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent implements OnInit {

  companyJobs: any[];

  constructor(private authState: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService) {
      this.companyJobs = this.fireServ.getCompanyJobs(this.authState.currentUser);
      console.log(this.companyJobs);
    }

  ngOnInit() {
  }

  logout() {
    this.authState.logout();
  }

}
