import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = new User();
  $: any;
  updated: boolean;

  constructor(private authState: AuthService, public fireServ: FirebaseService, private loader: Ng4LoadingSpinnerService) {
    this.updated = false;
    this.fireServ.getUser(this.authState.currentUserId).then(res => { this.user = res; this.user.$key = this.authState.currentUserId; });
  }

  ngOnInit() {
  }

  updateProfile(profileForm: NgForm) {
    this.loader.show();
    this.fireServ.updateUser(profileForm.value).then(
      res => {
        console.log(res);
        this.loader.hide();
        this.updated = true;
      }
    );
  }

  logout() {
    this.authState.logout();
  }

}
