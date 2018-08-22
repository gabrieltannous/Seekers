// import { Injectable } from '@angular/core';
// // import { AngularFireDatabase, FirebaseAuthState, AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { Router } from '@angular/router';
// import * as firebase from 'firebase/app';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   authState: FirebaseAuthState = null;
//   private user: Observable<firebase.User>;

//   constructor(private _firebaseAuth: AngularFireAuth, private af: AngularFire, private db: AngularFireDatabase, private router: Router) {
//     this.user = _firebaseAuth.authState;
//     af.auth.subscribe((auth) => {
//       this.authState = auth;
//     });
//    }

//    get authenticated(): boolean {
//      return this.authState !== null;
//    }

//    get currentUser(): any {
//      return this.authenticated ? this.authState.auth : null;
//    }

//    get currentUserId(): string {
//      return this.authenticated ? this.authState.uid : '';
//    }

//    get currentUserAnonymous(): boolean {
//      return this.authenticated ? this.authState.anonymous : false;
//    }

//    get currentUserDisplayName(): string {
//      if (!this.authenticated) {
//        return 'GUEST';
//      }
//      else if (this.currentUserAnonymous) {
//        return 'ANONYMOUS';
//       }
//      else {
//        return this.authState.auth.displayName || 'PAUTH USER';
//     }
//    }

//    googleLogin(): firebase.Promis<FirebaseAuthState> {
//      return this.socialSignIn(AuthProviders.Google);
//    }

//    signInWithGoogle() {
//     return this._firebaseAuth.auth.signInWithPopup(
//       new firebase.auth.GoogleAuthProvider()
//     );
//   }

//    private socialSignIn(provider: number): firebase.Promise<FirebaseAuthState> {
//      return this.af.auth.login({provider, method: AuthMethods.Popup})
//             .then(() => this.updateUserData())
//             .catch(error => console.log(error));
//    }

//    private updateUserData(): void {
//      let path = `users/${this.currentUserId}`;
//      let data = {
//        name: this.currentUser.displayName,
//        email: this.currentUser.email,
//      }

//      this.db.object(path).update(data)
//      .catch(error => console.log(error));
//    }

//    signOut(): void {
//     this.af.auth.logout();
//     this.router.navigate(['/'])
//   }
// }

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        console.log(this.userDetails);
      } else {
        this.userDetails = null;
      }
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
  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this._firebaseAuth.auth.signOut().then(res => this.router.navigate(['/']));
  }
}
