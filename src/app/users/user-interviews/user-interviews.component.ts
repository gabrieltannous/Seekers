import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Interview } from '../../models/interview';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-interviews',
  templateUrl: './user-interviews.component.html',
  styleUrls: ['./user-interviews.component.css']
})
export class UserInterviewsComponent implements OnInit {

  interviews: Interview[];
  constructor(private authServ: AuthService, private route: Router,
    private fireServ: FirebaseService, private loader: Ng4LoadingSpinnerService) {
      this.loadInterviews();
  }

  loadInterviews() {
    return this.fireServ.getUserInterviews(this.authServ.currentUserId).then(res => {
      this.interviews = res;
      this.loader.hide();
    });
  }

  ngOnInit() {
  }

  decide(interview, decision) {
    interview.decision = decision;
    this.loader.show();
    this.fireServ.updateInterview(interview).then(() => {
      this.loadInterviews().then(() => this.loader.hide());
    });
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/user/login']));
  }
}
