import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { first,map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthService {
  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private route: Router, private fireServ: FirebaseService,
    private loader: Ng4LoadingSpinnerService,private http: HttpClient) {
      this.loader.show();
      this.afAuth.authState.subscribe(auth => {
        this.authState = auth;
      });
  }

  async fake(): Promise<boolean>{
      return true;
  }

  logOut(){
    localStorage.removeItem("jwtToken");
  }
  loggedIn(){
    let token: string = localStorage.getItem('jwtToken');
    if(token === null || token === undefined || token === ""){
       return false;
    }
    return true;
  }

  isCompany() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http.get('http://localhost:3000/api/isCompany',httpOptions)
                                     .pipe(map((response: Response) => response));
  }

  isUser() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http.get('http://localhost:3000/api/isUser',httpOptions)
                                     .pipe(map((response: Response) => response));
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns current user observable
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    return this.authState['displayName'];
  }

  // async isUser(): Promise<boolean> {
  //   const user = await this.fireServ.getUser(this.currentUserId);
  //   return (user !== undefined);
  // }

  // async isCompany(): Promise<boolean> {
  //   const company = await this.fireServ.getCompany(this.currentUserId);
  //   return (company !== undefined);
  // }

  isAdmin(): boolean {
    return (this.currentUser.email === 'admin@admin.com');
  }

  isAdminEmail(email): boolean {
    return (email === 'admin@admin.com');
  }

  signUpEmailUser(user) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      user.uid = res.user.uid;
      this.fireServ.addUser(user);
      this.signInEmail(user).then(
        nav => {
          this.loader.hide();
          this.route.navigate(['/home']);
      });
    });
  }

  signUpEmailCompany(company) {
    return this.afAuth.auth.createUserWithEmailAndPassword(company.email, company.password)
    .then(res => {
      company.uid = res.user.uid;
      this.fireServ.addCompany(company);
      this.signInEmail(company).then(
        nav => {
          this.loader.hide();
          this.route.navigate(['/home']);
      });
    });
  }

  signInEmail(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(
      res => {
        this.loader.show();
        this.fireServ.getUser(res.user.uid).then(
          user => {
            if (user === undefined) {
              this.fireServ.addGoogleUser(res.user).then(
                () => {
                  this.route.navigate(['/home']);
                });
            } else {
                  this.route.navigate(['/home']);
            }
          });
      }
    ).catch(err => {
      this.loader.hide();
      console.error(err);
    });
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logout() { // log out the user and return to homepage
    return this.afAuth.auth.signOut();
  }

}

