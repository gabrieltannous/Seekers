import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user = new User();
  errorMessage: string = null;

  constructor(private authService: AuthService, private firebaseService: FirebaseService,
    private route: Router, private loader: Ng4LoadingSpinnerService,private userServ: UserService) {

    }

  ngOnInit() {
    this.loader.hide();
  }

  // register(user: NgForm) {
  //   if (user.value.fname === '' || user.value.fname === undefined || user.value.emai === '' || user.value.email === undefined) {
  //     this.errorMessage = 'Please fill all fields';
  //   } else {
  //     if (user.value.password === user.value.cpassword) {
  //       this.loader.show();
  //       this.authService.signUpEmailUser(user.value)
  //       .catch(err => {
  //         this.errorMessage = err.message;
  //         this.loader.hide();
  //       });
  //     } else {
  //       this.errorMessage = 'Passwords do not match';
  //     }
  //   }
  // }

    register(user: NgForm) {
    if (user.value.fullName === '' || user.value.fullName === undefined || 
        (user.value.email) === '' || user.value.email === undefined ||
        user.value.password === '' || user.value.password === undefined ||
        user.value.cpassword === '' || user.value.cpassword === undefined) {
          this.errorMessage = 'Please fill all fields';
    } 
    else {
        if (user.value.password === user.value.cpassword) {
            this.loader.show();        
            this.userServ.signupUser(user.value).subscribe(
                res => {
                  if(res["success"]){
                    this.userServ.signinUser(user.value).subscribe(
                      res => {
                        if(res["success"]){
                            localStorage.setItem('jwtToken', res["token"]);
                            this.loader.hide();
                            this.route.navigate(['/home']);
                        }else{
                          this.errorMessage = "Automatic login failed";
                          this.loader.hide();
                        }
                      },err => console.log(err));
                  }
                  else{
                    this.errorMessage = res["msg"][0];
                    this.loader.hide();
                  }
                },
                err => console.log(err)
            );
        } 
        else {
            this.errorMessage = 'Passwords do not match';
        }
    }
  }

}
