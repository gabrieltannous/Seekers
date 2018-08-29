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
    this.db.collection('companies').add({
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

  addUser(user) { // add a new user to database
    this.db.collection('users').add({
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

  getCompany(id) { // get company info
    this.db.collection('companies').ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          if (doc.id === id) {
            return doc;
          }
      });
    });
  }

  getUser(id) { // get user info
    this.db.collection('users').ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          if (doc.id === id) {
            return doc;
          }
      });
    });
  }

  getProfile() {
    const user = firebase.auth().currentUser;
    this.db.collection('users').ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          if (doc.id === user.uid) {
            return doc;
          }
      });
    });
  }

  updateCompany(company) { // update company info
    const washingtonRef = this.db.collection('companies').doc(company.id);

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
        name: company.name
    })
    .then(function() {
        console.log('Document successfully updated!');
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
    });
  }

  updateUser(user) { // update user info
    const washingtonRef = this.db.collection('users').doc(user.id);

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
        fname: user.fname,
        lname: user.lname
    })
    .then(function() {
        console.log('Document successfully updated!');
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
    });
  }

  deleteCopmany(id) { // delete a company -- admin function
    this.db.collection('companies').doc(id).delete();
  }

deleteUser(id) { // delete a user -- admin function
    this.db.collection('users').doc(id).delete();
    // user.delete().then(function() {
    //   // delete collection
    // }).catch(function(error) {
    //   // An error happened.
    // });
  }

}
