import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Company } from '../../models/company';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  company: Company = new Company();

  constructor(private authServ: AuthService, public fireServ: FirebaseService, private route: Router,
    private loader: Ng4LoadingSpinnerService, private router: ActivatedRoute,private userServ: UserService) {
      const companyId = this.router.snapshot.paramMap.get('id');
      this.loader.show();
      this.userServ.getAppliedCompanyProfile(companyId).subscribe(
      res => {

         if(res["success"]){
           this.company = res["company"];
         }
         this.loader.hide();
      });
  }

  ngOnInit() {
  }

  logout() {
    this.authServ.logOut();
    this.route.navigate(['/user/login']);
  }

}
