import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private fireServ: FirebaseService) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(auth => { // get user info of the current session
      if (auth) {
        this.authState = auth;
      } else {
        this.authState = null;
      }
    });
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  get currentUser(): any {
    return this.isLoggedIn ? this.authState : null;
  }

  isLoggedIn() { // check if the user is currently logged in
    return !(this.authState == null);
  }

  isUser() {
    console.log(this.currentUserId);
    console.log(this.fireServ.getUser(this.currentUserId));
    return (this.fireServ.getUser(this.currentUserId) !== null);
  }

  logout() { // log out the user and return to homepage
    this._firebaseAuth.auth.signOut().then(res => this.router.navigate(['/']));
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

  signUpEmail(user) {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .catch(function(error) {
      console.log(error);
    });
  }

  signInEmail(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .catch(function(error) {
      console.log(error);
    });
  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    );
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
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

