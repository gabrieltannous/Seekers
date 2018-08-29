import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isUser: boolean;

  constructor(private authState: AuthService) { }

  ngOnInit() {
    this.isUser = this.authState.isUser();
  }

  logout() {
    this.authState.logout();
  }

}
