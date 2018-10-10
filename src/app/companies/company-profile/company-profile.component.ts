import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css', '../../app.component.css']
})
export class CompanyProfileComponent implements OnInit {

  company: Company = new Company();
  numberOfJobs: number;
  numberOfApplicants: number;
  numberOfInterviews: number;
  successMessage: string = null;
  errorMessage: string = null;

  constructor(private authServ: AuthService, public fireServ: FirebaseService,
    private loader: Ng4LoadingSpinnerService, private route: Router) {
    this.fireServ.getCompany(this.authServ.currentUserId).then(
      res => {
        this.company = res;
        this.loader.hide();
    });
  }

  ngOnInit() {
  }

  upload(event) {
    const filename = event.path[0].value;
    this.loader.show();
    const path = 'Company-Photos/';
    this.fireServ.upload(event, path + this.company.name + filename.substring(filename.lastIndexOf('.'))).then(
      res => {
        res.ref.getDownloadURL().then(
          res2 => {
            this.company.photo = res2;
            this.successMessage = 'Profile photo uploaded succesfully';
            this.errorMessage = null;
            this.fireServ.updateCompany(this.company);
            this.loader.hide();
          }
        );
      }
    )
    .catch(err => {
      this.loader.hide();
      this.successMessage = null;
      this.errorMessage = err;
    });
  }

  updateProfile(profileForm: NgForm) {
    this.loader.show();
    this.fireServ.updateCompany(profileForm.value).then(
      res => {
        this.loader.hide();
        this.successMessage = 'Profile updated successfuly';
      }
    );
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/company/login']));
  }

}
