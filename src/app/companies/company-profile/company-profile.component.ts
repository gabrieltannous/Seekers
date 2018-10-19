import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

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
  isCompany: boolean;
  constructor(private authServ: AuthService, public fireServ: FirebaseService,
    private loader: Ng4LoadingSpinnerService, private route: Router,private companyServ: CompanyService) {
    this.loader.show()
    this.authServ.isCompany().subscribe(res => {
         this.isCompany = res["isCompany"];
         if(this.isCompany){
             this.loader.hide();
             this.company = res["company"];
         }
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
            this.companyServ.updateCompanyProfile(this.company).subscribe(
              res3 => {                       
                  this.successMessage = 'Profile photo uploaded succesfully';
                  this.errorMessage = null;
                  this.loader.hide();
              });
          }
        );
      }
    )
    .catch(err => {
      this.loader.hide();
      this.successMessage = null;
      this.errorMessage = err.message_;
    });
  }

  updateProfile(profileForm: NgForm) {
    this.loader.show();
    this.companyServ.updateCompanyProfile(profileForm.value).subscribe(
      res => {
        this.loader.hide();
        if (res["success"]) {
          this.successMessage = res["msg"][0];
          this.errorMessage = null;
        }else{
          this.errorMessage = res["msg"][0];
          this.successMessage = null;
        }
      }
    );
  }

  logout() {
    this.authServ.logOut();
    this.route.navigate(['/company/login']);
  }

}
