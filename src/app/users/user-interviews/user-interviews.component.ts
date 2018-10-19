import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Interview } from '../../models/interview';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './user-interviews.component.html',
  styleUrls: ['./user-interviews.component.css']
})
export class UserInterviewsComponent implements OnInit {

  interviews: Interview[];
  constructor(private authServ: AuthService, private route: Router,
    private fireServ: FirebaseService, 
    private loader: Ng4LoadingSpinnerService,private userServ: UserService) {
      this.loader.show();
      this.userServ.getUserInterviews().subscribe(res => {
        if (res["success"]) {
          this.interviews = res["interviews"];         
        }
      
      this.loader.hide();
    });
  }

  ngOnInit() {
  }

  decide(interview, decision) {
    interview.decision = decision;
    this.loader.show();
    this.userServ.updateUserInterview(interview).subscribe(res => {
        if (!res["success"])
          alert(res["msg"]);
        this.loader.hide();
    });
  }

  logout() {
    this.authServ.logOut();
    this.route.navigate(['/user/login']);
  }
}
