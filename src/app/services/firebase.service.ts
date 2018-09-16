import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public companies: Observable<any[]>;
  public users: Observable<any[]>;
  public itemsCollection: AngularFirestoreCollection<any>;
  public jobs: Observable<any[]>;
  itemDoc: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) {
      this.companies = db.collection('/companies').valueChanges();
      this.users = db.collection('/users').valueChanges();
      this.jobs = db.collection('jobs').valueChanges();
  }

  addCompany(company) { // add a new company to database
    return this.db.collection('companies').doc(company.uid).set({
      name: company.name,
      email: company.email
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  addUser(user) { // add a new user to
    return this.db.collection('users').doc(user.uid).set({
      fullName: user.fname + ' ' + user.lname,
      email: user.email
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  addGoogleUser(user) { // add a new user to
    return this.db.collection('users').doc(user.uid).set({
      fullName: user.displayName,
      email: user.email,
      photo: user.photoURL
    })
    .catch(err => {
        console.error(err);
    });
  }

  addJob(job) { // add a new user to
    return this.db.collection('jobs').add({
      title: job.title,
      companyId: job.companyId,
      type: job.type,
      salary: job.salary
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  async getCompany(id): Promise<Object> { // get company info
    let company;
    await this.db.collection('companies').doc(id).ref.get()
    .then(res => {
      if (res.data != null) {
        company = res.data();
      }
    }).catch(err => {
      console.log(err);
    });
    console.log('company is ' + company);
    return company;
  }

  async getUser(id): Promise<Object> { // get user info
    let user;
    await this.db.collection('users').doc(id).ref.get()
    .then(res => {
      if (res.data != null) {
        user = res;
      }
    }).catch(function(error) {
      console.log('Error getting document:', error);
      user = null;
    });
    return user.data();
  }

  async getCounter(id): Promise<number> { // get user info
    let counter;
    console.log('inside');
    await this.db.collection('counter').doc(id).ref.get().then(doc => {
      counter = doc.data().count;
    }).catch(function(error) {
        console.log('Error getting document:', error);
    });
    console.log('counter inside is' + counter);
    return counter;
  }

  getJobs() {
    return this.db.collection('jobs').valueChanges(); /* , ref => ref.where('expenseId', '==', true)); */;
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
