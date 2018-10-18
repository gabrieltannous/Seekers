import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user) {
    return this.http
      .post('http://localhost:3000/api/CreateUser/', user)
      .pipe(map((response: Response) => response));
  }

  updateUser(user) {
    return this.http
      .post('http://localhost:3000/api/UpdateUser/', user)
      .pipe(map((response: Response) => response));
  }

  saveGoogleUser(user) {
    return this.http
      .post('http://localhost:3000/api/SaveGoogleUser/', user)
      .pipe(map((response: Response) => response));
  }

  GetUser(user) {
    return this.http
      .get('http://localhost:3000/api/getUser', {
        params: { email: user.email }
      })
      .pipe(map((response: Response) => response));
  }

  AuthUser(user) {
    return this.http
      .get('http://localhost:3000/api/authUser', {
        params: { email: user.email, password: user.password }
      })
      .pipe(map((response: Response) => response));
  }

  isUser(email) {
    return this.http
      .get('http://localhost:3000/api/isUser', { params: { email: email } })
      .pipe(map((response: Response) => response));
  }

  GetAllUsers() {
    return this.http
      .get('http://localhost:3000/api/getAllUsers/')
      .pipe(map((response: Response) => response));
  }

  deleteUser(id) {
    return this.http
      .post('http://localhost:3000/api/deleteUser/', { id: id })
      .pipe(map((response: Response) => response));
  }
}
