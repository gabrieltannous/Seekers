import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  
  constructor(private http: HttpClient) {}
  
  signupUser(user) {
    return this.http
      .post('http://localhost:3000/api/signupUser', user)
      .pipe(map((response: Response) => response));
  }

  signinUser(user) {
    return this.http
      .post('http://localhost:3000/api/signinUser', user)
      .pipe(map((response: Response) => response));
  }

  updateUserProfile(user) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http
      .post('http://localhost:3000/api/updateUserProfile', user,httpOptions)
      .pipe(map((response: Response) => response));
  }

  getAllJobs() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http
      .get('http://localhost:3000/api/getAllJobs',httpOptions)
      .pipe(map((response: Response) => response));
  }

  searchJobsWithOptions(jobs, title, type, salary) {
    const resultJobs = new Array();
    jobs.map(job => {
        let titleChecked = true;
        let typeChecked = true;
        let salaryChecked = true;
        if (salary !== undefined && salary !== null) {
          if (job['salary'] < salary) {
            salaryChecked = false;
          }
        }
        if (type !== undefined && type !== '') {
          if (job['type'].toLowerCase().indexOf(type.toLowerCase()) === -1) {
            typeChecked = false;
          }
        }
        if (title !== undefined && title !== '') {
          if (job['title'].toLowerCase().indexOf(title.toLowerCase()) === -1) {
            titleChecked = false;
          }
        }
        if (titleChecked && typeChecked && salaryChecked) {
          resultJobs.push(job);
        }
      });
    return resultJobs;
  }


  applyJob(jobId) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http
      .post('http://localhost:3000/api/applyJob',{jobId:jobId},httpOptions)
      .pipe(map((response: Response) => response));
  }

  getAppliedJobs() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http
      .get('http://localhost:3000/api/getAppliedJobs',httpOptions)
      .pipe(map((response: Response) => response));
  }

  getAppliedCompanyProfile(companyId) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http
      .post('http://localhost:3000/api/getAppliedCompanyProfile',
        {companyId:companyId},httpOptions)
      .pipe(map((response: Response) => response));
  }

  getUserInterviews() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http
      .get('http://localhost:3000/api/getUserInterviews',httpOptions)
      .pipe(map((response: Response) => response));
  }

  
  updateUserInterview(interview) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http
      .post('http://localhost:3000/api/updateUserInterview',interview,httpOptions)
      .pipe(map((response: Response) => response));
  }
}