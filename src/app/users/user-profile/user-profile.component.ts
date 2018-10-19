import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
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

  constructor(private authServ: AuthService, public fireServ: FirebaseService, private route: Router,
    private loader: Ng4LoadingSpinnerService,private userServ: UserService) {
    this.loader.show()
    this.authServ.isUser().subscribe(res => {
         this.isUser = res["isUser"];
         if(this.isUser){
             this.loader.hide();
             this.user = res["user"];
         }
      });
  }

  ngOnInit() {
  }

  updateProfile(profileForm: NgForm) {
    this.loader.show();
    this.userServ.updateUserProfile(profileForm.value).subscribe(
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

  upload(event, type) {
    const filename = event.path[0].value;
    this.loader.show();
    let path;
    if (type === 'resume') {
      path = 'Resumes/';
    } else {
      path = 'User-Photos/';
    }
    this.fireServ.upload(event, path + this.user.fullName + filename.substring(filename.lastIndexOf('.'))).then(
      res => {
        res.ref.getDownloadURL().then(
          res2 => {
            if (type === 'resume') {
              this.user.resume = res2;
              this.successMessage = 'Resume uploaded succesfuly';
            } else {
              this.user.photo = res2;
              this.successMessage = 'Profile photo uploaded succesfully';
            }
            this.errorMessage = null;
            this.userServ.updateUserProfile(this.user).subscribe(
              res3 => {                       
                  this.loader.hide();
            });         
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

  logout() {
    this.authServ.logOut();
    this.route.navigate(['/user/login']);
  }

}
