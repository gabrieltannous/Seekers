import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  isUser = false;
  isCompany = false;
  isAuth: boolean;

  constructor(private authState: AuthService) {
    console.log('inside cons');
  }

  ngOnInit() {
    this.isAuth = this.authState.isLoggedIn();
    console.log('inside init');
  }

  logout() {
    this.authState.logout();
  }
}
