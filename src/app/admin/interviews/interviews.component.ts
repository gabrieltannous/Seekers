import { Component, OnInit } from '@angular/core';
import { Interview } from '../../models/interview';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})

export class InterviewsComponent implements OnInit {

  interviews: any[];
  interview = new Interview;

  constructor(private loader: Ng4LoadingSpinnerService, private fireServ: FirebaseService,
    private authServ: AuthService, private route: Router) {
    this.loadInterviews();
  }

  loadInterviews() {
    return this.fireServ.getAllInterviews().then(res => {
      this.interviews = res;
      this.loader.hide();
    });
  }

  ngOnInit() {
  }

  fillModal(interview) {
    this.interview = interview;
  }

  editInterview() {
    this.loader.show();
    this.fireServ.updateInterview(this.interview).then(() => this.loadInterviews());
  }

  delete($key) {
    this.loader.show();
    this.fireServ.deleteInterview($key).then(() => {
      this.loadInterviews().then(() => this.loader.hide());
    });
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/admin']));
  }
}
