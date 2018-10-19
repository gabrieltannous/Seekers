import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  authState: any = null;

  constructor(
    private route: Router,
    private loader: Ng4LoadingSpinnerService,
    private http: HttpClient
  ) {
    this.loader.show();
  }

  async fake(): Promise<boolean> {
    return true;
  }

  loggedIn() {
    const token: string = localStorage.getItem('jwtToken');
    if (token === null || token === undefined || token === '') {
      return false;
    }
    return true;
  }

  isCompany() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .get('http://localhost:3000/api/auth/isCompany', httpOptions)
      .pipe(map((response: Response) => response));
  }

  isUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .get('http://localhost:3000/api/auth/isUser', httpOptions)
      .pipe(map((response: Response) => response));
  }

  logout() {
    // log out the user and return to homepage
    this.isUser().subscribe(res => {
      localStorage.removeItem('jwtToken');
      res
        ? this.route.navigate(['/user/login'])
        : this.route.navigate(['/company/login']);
    });
  }
}
