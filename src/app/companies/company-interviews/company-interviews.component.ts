import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Interview } from '../../models/interview';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-interviews',
  templateUrl: './company-interviews.component.html',
  styleUrls: ['./company-interviews.component.css']
})
export class CompanyInterviewsComponent implements OnInit {

  interviews: Interview[];
  constructor(private authServ: AuthService, private route: Router,
    private fireServ: FirebaseService, private loader: Ng4LoadingSpinnerService) {
      this.loadInterviews();
  }

  loadInterviews() {
    return this.fireServ.getCompanyInterviews(this.authServ.currentUserId).then(res => {
      this.interviews = res;
      this.loader.hide();
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/user/login']));
  }
}
