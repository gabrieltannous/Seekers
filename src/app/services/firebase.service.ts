import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Job } from '../models/job';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from '../models/user';
import { Company } from '../models/company';
import { map } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public companies: Observable<any[]>;
  public users: Observable<any[]>;
  public itemsCollection: AngularFirestoreCollection<any>;
  public Appliedjobs: any[];
  public ref: AngularFireStorageReference;
  public task: AngularFireUploadTask;
  itemDoc: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore, private loader: Ng4LoadingSpinnerService, private afStorage: AngularFireStorage) {
      this.companies = db.collection('companies').valueChanges();
      this.users = db.collection('users').valueChanges();
  }

  upload(event, name) {
    return this.afStorage.upload(name, event.target.files[0]);
  }

  async getUserJobs(userId) {
    const jobs = new Array();
    await this.db.collection('jobs').snapshotChanges().subscribe(
    async res => {
      await res.map(async a => {
        const $key = a.payload.doc.id;
        const jobData = a.payload.doc.data();
        let applied;
        await this.db.collection('applied', ref => ref.where('job', '==', $key) .where('user', '==', userId)).snapshotChanges().subscribe(
          doc => {
            if (doc.length === 1) {
              applied = true;
            } else {
              applied = false;
            }
            jobs.push({$key, ...jobData, applied});
        });
      });
    });
    return jobs;
  }

  async getCompanyJobs(companyId): Promise<any[]> {
    const jobs = new Array();
    await this.db.collection('jobs', ref => ref.where('companyId', '==', companyId)).snapshotChanges().subscribe(
    res => {
      res.map(a => {
        const $key = a.payload.doc.id;
        const data = a.payload.doc.data();
        jobs.push({$key, ...data});
      });
    });
    return jobs;
  }

  // Get the jobs that the user have applied to
  async getUserAppliedJobs(userId) {
    const jobs = new Array();
    await this.db.collection('jobs').snapshotChanges().subscribe(
    async res => {
      await res.map(async a => {
        const $key = a.payload.doc.id;
        const jobData = a.payload.doc.data();
        let applied;
        await this.db.collection('applied', ref => ref.where('job', '==', $key) .where('user', '==', userId)).snapshotChanges().subscribe(
          doc => {
            if (doc.length === 1) {
              applied = true;
              jobs.push({$key, ...jobData, applied});
            } else {
              applied = false;
            }
        });
      });
    });
    return jobs;
  }

  // Get job applicants
  async getApplicants(jobId): Promise<any[]> {
    const applicants = new Array();
    await this.db.collection('applied', ref => ref.where('job', '==', jobId)).snapshotChanges().subscribe(
    async res => {
      await res.map(async a => {
        const userId = a.payload.doc.data()['user'];
        await this.db.collection('users').doc(userId).ref.get().then(
          async doc => {
            const $key = doc.id;
            applicants.push({$key, ...doc.data()});
          }
        );
      });
    });
    return applicants;
  }

  // Get all users - for admin
  async getAllUsers(): Promise<User[]> {
    const users = new Array();
    await this.db.collection('users').snapshotChanges().subscribe(items => {
      items.map(a => {
        const $key = a.payload.doc.id;
        const data = a.payload.doc.data();
        users.push({ $key, ...data });
      });
    });
    return users;
  }

  // Get all companies - for admin
  async getAllCompanies(): Promise<Company[]> {
    const companies = new Array();
    await this.db.collection('companies').snapshotChanges().subscribe(items => {
      items.map(a => {
        const $key = a.payload.doc.id;
        const data = a.payload.doc.data();
        companies.push({ $key, ...data });
      });
    });
    return companies;
  }

  // Get all jobs - for admin
  async getAllJobs(): Promise<Job[]> {
    const jobs = new Array();
    await this.db.collection('jobs').snapshotChanges().subscribe(items => {
      items.map(a => {
        const $key = a.payload.doc.id;
        const data = a.payload.doc.data();
        jobs.push({ $key, ...data });
      });
    });
    return jobs;
  }

  // Check if user exist in database
  getUserByEmail(email) {
    return this.db.collection('users' , ref => ref.where('email', '==', email)).snapshotChanges();
  }

  // Check if company exist in database
  getCompanyByEmail(email) {
    return this.db.collection('companies' , ref => ref.where('email', '==', email)).snapshotChanges();
  }

  addCompany(company) { // add a new company to database
    return this.db.collection('companies').doc(company.uid).set({
      name: company.name,
      email: company.email,
      address: '',
      phone: ''
    })
    .catch(err => {
      console.error(err);
    });
  }

  addUser(user) { // add a new user to
    return this.db.collection('users').doc(user.uid).set({
      fullName: user.fname + ' ' + user.lname,
      email: user.email,
      mobile: '',
      phone: '',
      resume: '',
      address: '',
      photo: ''
    })
    .catch(err => {
      console.error(err);
    });
  }

  addGoogleUser(user) { // add a new user to
    return this.db.collection('users').doc(user.uid).set({
      fullName: user.displayName,
      email: user.email,
      photo: user.photoURL,
      mobile: '',
      phone: '',
      resume: '',
      address: '',
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
    .catch(err => {
      console.error(err);
    });
  }

  setInterview(interview) { // add a new user to
    return this.db.collection('interviews').add({
      companyId: interview.companyId,
      userId: interview.userId,
      jobId: interview.jobId,
      date: interview.date
    })
    .catch(err => {
      console.error(err);
    });
  }

  async getCompany(id): Promise<Company> { // get company info
    let company;
    await this.db.collection('companies').doc(id).ref.get()
    .then(res => {
      if (res.exists) {
        const $key = res.id;
        company = {$key, ...res.data()};
      }
    })
    .catch(err => {
      console.error(err);
    });
    return company;
  }

  async getUser(id): Promise<User> { // get user info
    let user;
    await this.db.collection('users').doc(id).ref.get()
    .then(res => {
      if (res.exists) {
        const $key = res.id;
        user = {$key, ...res.data()};
      }
    })
    .catch(err => {
      console.error(err);
      user = null;
    });
    return user;
  }

  async getAdmin(id): Promise<Admin> { // get user info
    let admin;
    await this.db.collection('admins').doc(id).ref.get()
    .then(res => {
      if (res.exists) {
        const $key = res.id;
        admin = {$key, ...res.data()};
      }
    })
    .catch(err => {
      console.error(err);
      admin = null;
    });
    return admin;
  }

  updateCompany(company) { // update company info
    const companyRef = this.db.collection('companies').doc(company.$key);

    return companyRef.update({
        name: company.name,
        phone: (company.phone == null ? '' : company.phone),
        address: (company.address == null ? '' : company.address),
        website: (company.website == null ? '' : company.website)
    })
    .catch(function(error) {
        console.error('Error updating document: ', error);
    });
  }

  updateUser(user) { // update user info
    const userRef = this.db.collection('users').doc(user.$key);

    return userRef.update({
        fullName: user.fullName,
        mobile: (user.mobile == null ? '' : user.mobile),
        phone: (user.phone == null ? '' : user.phone),
        address: (user.address == null ? '' : user.address),
        resume: (user.resume == null ? '' : user.resume),
        photo: (user.photo == null ? '' : user.photo)
    })
    .catch(function(error) {
        console.error('Error updating document: ', error);
    });
  }

  updateJob(job) { // update job info
    const jobRef = this.db.collection('jobs').doc(job.$key);

    return jobRef.update({
        title: (job.title == null ? '' : job.title),
        type: (job.type == null ? '' : job.type),
        salary: (job.salary == null ? '' : job.salary),
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

  deleteJob(id) { // delete a job -- admin function
    return this.db.collection('jobs').doc(id).delete();
  }

  deleteApply(id) { // delete an apply -- admin function
    return this.db.collection('applies').doc(id).delete();
  }
}
