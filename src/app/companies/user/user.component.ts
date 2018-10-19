import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from '../../models/user';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();

  constructor(private authServ: AuthService, public fireServ: FirebaseService, private route: Router,
    private loader: Ng4LoadingSpinnerService, private router: ActivatedRoute,private companyServ: CompanyService) {
      const userId = this.router.snapshot.paramMap.get('id');
      this.loader.show();
      this.companyServ.getApplicantProfile(userId).subscribe(
      res => {
         if(res["success"]){
           this.user = res["user"];
         }
         this.loader.hide();
      });

  }

  ngOnInit() {
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/company/login']));
  }


}
