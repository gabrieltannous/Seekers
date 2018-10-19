import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-applies',
  templateUrl: './user-applies.component.html',
  styleUrls: ['./user-applies.component.css']
})
export class UserAppliesComponent implements OnInit {

  appliedJobs: any[];

  constructor(private authServ: AuthService, private fireServ: FirebaseService,
    public loader: Ng4LoadingSpinnerService, private route: Router,private userServ: UserService) {
      this.loader.show();
      this.userServ.getAppliedJobs().subscribe(res => {
        if(res["success"]){
          this.appliedJobs = res["applied"];
        }
        this.loader.hide();
      });
    }

  ngOnInit() {
    this.loader.hide();
  }

  logout() {
    this.authServ.logOut();
    this.route.navigate(['/user/login']);
  }

}
