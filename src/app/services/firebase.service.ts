import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public companies: Observable<any[]>;
  public users: Observable<any[]>;

  constructor(private db: AngularFirestore) {
      this.companies = db.collection('/companies').valueChanges();
      this.users = db.collection('/users').valueChanges();
  }

  addCompany(company) { // add a new company to database
    return this.db.collection('companies').add({
      name: company.name,
      email: company.email
    })
    .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
        console.error('Error adding document: ', error);
    });
  }

  addUser(user) { // add a new user to
    return this.db.collection('users').add({
      uid: user.uid,
      fname: user.fname,
      lname: user.lname,
      email: user.email
    })
    .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
        console.error('Error adding document: ', error);
    });
  }

  addGoogleUser(user) { // add a new user to
    return this.db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photo: user.photoURL
      })
      .then(res => {
          console.log(res);
      })
      .catch(err => {
          console.error(err);
      });
  }

  getCompany(id) { // get company info
    this.db.collection('companies').doc(id).ref.get().then(function(doc) {
      if (doc.exists) {
          return doc;
      } else {
          return null;
      }
    }).catch(function(error) {
        console.log('Error getting document:', error);
        return null;
    });
  }

  getUser(id) { // get user info
    this.db.collection('users').doc(id).ref.get().then(function(doc) {
      if (doc.exists) {
          return doc;
      } else {
          return null;
      }
    }).catch(function(error) {
        console.log('Error getting document:', error);
        return null;
    });
  }

  updateCompany(company) { // update company info
    const companyRef = this.db.collection('companies').doc(company.id);

    return companyRef.update({
        name: company.name
    })
    .then(function() {
        console.log('Document successfully updated!');
    })
    .catch(function(error) {
        console.error('Error updating document: ', error);
    });
  }

  updateUser(user) { // update user info
    const userRef = this.db.collection('users').doc(user.id);

    return userRef.update({
        fname: user.fname,
        lname: user.lname
    })
    .then(function() {
        console.log('Document successfully updated!');
    })
    .catch(function(error) {
        console.error('Error updating document: ', error);
    });
  }

  deleteCopmany(id) { // delete a company -- admin function
    return this.db.collection('companies').doc(id).delete();
  }

  deleteUser(id) { // delete a user -- admin function
    return this.db.collection('users').doc(id).delete();
  }

}
