import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Interview } from '../../models/interview';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './user-interviews.component.html',
  styleUrls: ['./user-interviews.component.css']
})
export class UserInterviewsComponent implements OnInit {
  interviews: Interview[];
  constructor(
    private authServ: AuthService,
    private loader: Ng4LoadingSpinnerService,
    private userServ: UserService
  ) {
    this.loader.show();
    this.userServ.getUserInterviews().subscribe(res => {
      if (res['success']) {
        if (res['interviews'].length !== 0) {
          this.interviews = res['interviews'];
        }
      }

      this.loader.hide();
    });
  }

  ngOnInit() {}

  decide(interview, decision) {
    interview.decision = decision;
    this.loader.show();
    this.userServ.updateUserInterview(interview).subscribe(res => {
      if (!res['success']) { alert(res['msg']); }
      this.loader.hide();
    });
  }

  logout() {
    this.authServ.logout();
  }
}
