import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  successMessage: string = null;
  errorMessage: string = null;
  appliedJobs: any[];
  numberOfApplies: number;
  isUser: boolean;

  constructor(
    private authServ: AuthService,
    private loader: Ng4LoadingSpinnerService,
    private userServ: UserService
  ) {
    this.loader.show();
    this.authServ.isUser().subscribe(res => {
      this.isUser = res['isUser'];
      if (this.isUser) {
        this.loader.hide();
        this.user = res['user'];
      }
    });
  }

  ngOnInit() {}

  updateProfile(profileForm: NgForm) {
    this.loader.show();
    this.userServ.updateUserProfile(profileForm.value).subscribe(res => {
      this.loader.hide();
      if (res['success']) {
        this.successMessage = res['msg'][0];
        this.errorMessage = null;
      } else {
        this.errorMessage = res['msg'][0];
        this.successMessage = null;
      }
    });
  }

  logout() {
    this.authServ.logout();
  }
}
