import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.css']
})
export class UserJobsComponent implements OnInit {

  constructor(private authState: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authState.logout();
  }

}
