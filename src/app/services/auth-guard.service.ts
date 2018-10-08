import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  isUser: boolean;
  isCompany: boolean;

  constructor(private route: Router, private authServ: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.authServ.isLoggedIn().then(async auth => {
      if (auth === null) {
        if (route.data['roles'] === undefined) {
          return true;
        }
        this.route.navigate(['/user/login']);
      } else {
        if (route.data['roles'] !== undefined) {
          const roleUser = (route.data['roles'].indexOf('user') !== -1);
          const roleCompany = (route.data['roles'].indexOf('company') !== -1);
          const roleAdmin = (route.data['roles'].indexOf('admin') !== -1);

          await this.authServ.isUser().then(res => {
            this.isUser = res;
          });

          await this.authServ.isCompany().then(res => {
            this.isCompany = res;
          });

          if (roleUser && roleCompany && (this.isUser || this.isCompany)) {
            return true;
          } else if (roleUser && this.isUser) {
              return true;
          } else if (roleCompany && this.isCompany) {
              return true;
          } else if (roleAdmin && this.authServ.isAdmin()) {
              return true;
          }

          if ((roleUser && this.isCompany) || (roleCompany && this.isUser) || (roleAdmin && (this.isCompany || this.isUser))) {
            this.route.navigate(['/home']);
          } else if ((roleUser || roleCompany) && this.authServ.isAdmin()) {
            this.route.navigate(['/admin/dashboard']);
          }
        } else {
          if (this.authServ.isAdmin()) {
            this.route.navigate(['/admin/dashboard']);
          } else {
            this.route.navigate(['/home']);
          }
        }
      }
    });
  }
}
