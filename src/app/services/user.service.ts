import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  signupUser(user) {
    return this.http
      .post('http://localhost:3000/api/signupUser', user)
      .pipe(map((response: Response) => response));
  }

  signinUser(user) {
    return this.http
      .post('http://localhost:3000/api/signinUser', user)
      .pipe(map((response: Response) => response));
  }

  updateUserProfile(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post('http://localhost:3000/api/updateUserProfile', user, httpOptions)
      .pipe(map((response: Response) => response));
  }

  getJobs() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .get('http://localhost:3000/api/getJobs', httpOptions)
      .pipe(map((response: Response) => response));
  }

  applyToJob(job) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post('http://localhost:3000/api/applyToJob', job, httpOptions)
      .pipe(map((response: Response) => response));
  }
}
