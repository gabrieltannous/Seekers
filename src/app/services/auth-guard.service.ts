import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {
  isUser: boolean;
  isCompany: boolean;

  constructor(private router: Router, private authService: AuthService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( this.authService.isLoggedIn() ) {
      const roles = route.data['roles'] as Array<string>;
      if ( roles[0] === 'user' ) {
        await this.authService.isUser().then(res => { this.isUser = res; });
        if (this.isUser) {
         return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      } else if ( roles[0] === 'company' ) {
        await this.authService.isCompany().then(res => { this.isCompany = res; });
        if (this.isCompany) {
          return true;
         } else {
           this.router.navigate(['/home']);
           return false;
         }
      }
      return true;
    }
    this.router.navigate(['/user/login']);
    return false;
  }
}
