import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent implements OnInit {

  companyJobs: any[];

  constructor(private authServ: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService, private route: Router) {
      this.fireServ.getCompanyJobs(this.authServ.currentUserId).then(res => this.companyJobs = res);
  }

  ngOnInit() {
    this.loader.hide();
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/company/login']));
  }

}
