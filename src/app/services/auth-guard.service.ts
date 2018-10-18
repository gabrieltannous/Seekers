import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  isUser: boolean;
  isCompany: boolean;
  isAdmin: boolean;
  constructor(private route: Router, private authServ: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    //guest
    return this.authServ.fake().then(async f =>{
      if (!this.authServ.loggedIn()){
        if (route.data['roles'] === undefined) {
          return true;
        }
        this.route.navigate(['/user/login']);
      }
      else {//user
      // alert("Logged 1");
        if (route.data['roles'] === undefined) { //user but go to guest page
              this.route.navigate(['/home']);
        }else{
           const roleCompany = (route.data['roles'].indexOf('company') !== -1);
           await this.authServ.isCompany().subscribe(res => {
            this.isCompany = res["isCompany"];
          });
           if(this.isCompany && roleCompany){
             
           }
           return true;
        }
      }
    });

    
  }
}
