import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private loader: Ng4LoadingSpinnerService, private authServ: AuthService, private route: Router) { }

  ngOnInit() {
    this.loader.hide();
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/admin']));
  }

}
