import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private route: Router, private fireServ: FirebaseService,
    private loader: Ng4LoadingSpinnerService) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(auth => { // get user info of the current session
      if (auth) {
        this.authState = auth;
        this.route.navigate(['/home']);
      } else {
        if (localStorage.getItem('user') != null) {
          console.log(localStorage.getItem('user'));
          //  this.signInEmail(localStorage.getItem('user').valueOf['email'], localStorage.getItem('user').valueOf['email'];)
        }
        this.authState = null;
        this.loader.hide();
      }
    });
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  get currentUser(): any {
    return this.isLoggedIn ? this.authState : null;
  }

  isLoggedIn(): boolean { // check if the user is currently logged in
    return !(this.authState == null);
  }

  async isUser(): Promise<boolean> {
    const user = await this.fireServ.getUser(this.currentUserId);
    return (user !== undefined);
  }

  async isCompany(): Promise<boolean> {
    const company = await this.fireServ.getCompany(this.currentUserId);
    return (company !== undefined);
  }

  logout() { // log out the user and return to homepage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('company');
    this._firebaseAuth.auth.signOut().then(res => this.route.navigate(['/']));
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  get currentUserDisplayName(): string {
    if (!this.authenticated) {
      return 'GUEST';
    } else if (this.currentUserAnonymous) {
      return 'ANONYMOUS';
    } else {
      return this.authState.displayName || 'PAUTH USER';
    }
  }

  signUpEmailUser(user) {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
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
    return firebase.auth().createUserWithEmailAndPassword(company.email, company.password)
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
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      localStorage.setItem('token', JSON.stringify(user));
    })
    .catch(error => {
      console.log(error);
    });
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(
      res => {
        console.log(res.user);
        this.fireServ.addGoogleUser(res.user);
      }, err => {
        console.log(err);
      }
    );
  }

  resetPassword(email) {
    return this._firebaseAuth.auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }
}

