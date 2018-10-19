import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  isUser: boolean;
  isCompany: boolean;
  isAdmin: boolean;
  constructor(private route: Router, private authServ: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // guest
    return this.authServ.fake().then(async f => {
      if (!this.authServ.loggedIn()) {
        if (route.data['roles'] === undefined) {
          return true;
        }
        this.route.navigate(['/user/login']);
      } else {
        // user
        if (route.data['roles'] === undefined) {
          // user but go to guest page
          this.route.navigate(['/home']);
        } else {
          const roleCompany = route.data['roles'].indexOf('company') !== -1;
          const roleUser = route.data['roles'].indexOf('user') !== -1;
          const roleAdmin = route.data['roles'].indexOf('admin') !== -1;

          // company
          await this.authServ
            .isCompany()
            .toPromise()
            .then(res => {
              this.isCompany = res['isCompany'];
            });

          if (this.isCompany && roleCompany) {
            return true;
          } else if (this.isCompany && !roleCompany) {
            this.route.navigate(['/home']);
          }

          // user
          await this.authServ
            .isUser()
            .toPromise()
            .then(res => {
              this.isUser = res['isUser'];
            });

          if (this.isUser && roleUser) {
            return true;
          } else if (this.isUser && !roleUser) {
            this.route.navigate(['/home']);
          }
          return true;
        }
      }
    });
  }
}
