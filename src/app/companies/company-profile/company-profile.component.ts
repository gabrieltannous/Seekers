import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css', '../../app.component.css']
})
export class CompanyProfileComponent implements OnInit {

  company: Company = new Company();
  $: any;
  updated: boolean;

  constructor(private authState: AuthService, public fireServ: FirebaseService, private loader: Ng4LoadingSpinnerService) {
    this.updated = false;
    this.fireServ.getCompany(this.authState.currentUserId).then(
      res => { this.company = res; this.company.$key = this.authState.currentUserId;
    });
  }

  ngOnInit() {
  }

  updateProfile(profileForm: NgForm) {
    this.loader.show();
    this.fireServ.updateCompany(profileForm.value).then(
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
