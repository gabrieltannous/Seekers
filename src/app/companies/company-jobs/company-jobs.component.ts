import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent implements OnInit {

  companyJobs: any[];

  constructor(private authServ: AuthService, public loader: Ng4LoadingSpinnerService, private companyServ: CompanyService) {
      this.companyServ.getAllCompanyJobs().subscribe(
        res => {
          this.companyJobs = res['jobs'];
      });
  }

  ngOnInit() {
    this.loader.hide();
  }

  logout() {
    this.authServ.logout();
  }

}
