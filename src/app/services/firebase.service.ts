import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Job } from '../models/job';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public companies: Observable<any[]>;
  public users: Observable<any[]>;
  public itemsCollection: AngularFirestoreCollection<any>;
  public jobs: any[];
  public Appliedjobs: any[];
  itemDoc: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore, private loader: Ng4LoadingSpinnerService) {
      this.companies = db.collection('companies').valueChanges();
      this.users = db.collection('users').valueChanges();
      this.loadJobs(db);
  }

  private loadJobs(db: AngularFirestore) {
    db.collection('jobs').snapshotChanges().subscribe(items => {
      this.jobs = items.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data();
        return { id, ...data };
      });
    });
  }

  getTheJobs(): any[] {
    return this.jobs;
  }

  getAppliedJobs(user): any[] {
    this.jobs.map(c => {
      this.haveApplied(c.id, user.uid).valueChanges().subscribe(
        res => {
          if (res.length === 1) {
            c.applied = true;
          } else {
            c.applied = false;
          }
        }
      );
    });
    return this.jobs;
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
    return company;
  }

  async getUser(id): Promise<User> { // get user info
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

  getJobs() {
    return this.db.collection<Job>('jobs'); /* , ref => ref.where('expenseId', '==', true)); */
  }

  haveApplied(jobId: string, userId: string) {
    // let applied;
    return this.db.collection('applied', ref => ref.where('user', '==', userId) && ref.where('job', '==', jobId));
    // .valueChanges().subscribe(
    //   res => {
    //     applied = res.length;
    //     console.log(res.length);
    //   }
    // );
    // console.log('length is ' + applied);
    // return (applied === 0 ? false : true);
  }

  updateCompany(company) { // update company info
    const companyRef = this.db.collection('companies').doc(company.$key);

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
    const userRef = this.db.collection('users').doc(user.$key);

    return userRef.update({
        fullName: user.fullName
    })
    .then(function() {
        console.log('Document successfully updated!');
    })
    .catch(function(error) {
        console.error('Error updating document: ', error);
    });
  }

  apply(jobId, userId) {
    this.db.collection('applied').add({
      job : jobId,
      user : userId
    });
  }

  deleteCopmany(id) { // delete a company -- admin function
    return this.db.collection('companies').doc(id).delete();
  }

  deleteUser(id) { // delete a user -- admin function
    return this.db.collection('users').doc(id).delete();
  }

}
