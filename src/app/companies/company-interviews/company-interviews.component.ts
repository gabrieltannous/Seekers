import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Interview } from '../../models/interview';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './company-interviews.component.html',
  styleUrls: ['./company-interviews.component.css']
})
export class CompanyInterviewsComponent implements OnInit {

  interviews: Interview[];
  constructor(private authServ: AuthService, private route: Router,
    private fireServ: FirebaseService, private loader: Ng4LoadingSpinnerService,private companyServ: CompanyService) {
      this.loader.show();
      this.companyServ.getCompanyInterviews().subscribe(res => {
      if(res["success"]){
          this.interviews = res["interviews"];
      }
      this.loader.hide();
    });
  }


  ngOnInit() {
  }

  logout() {
    this.authServ.logOut();
    this.route.navigate(['/company/login']);
  }
}
