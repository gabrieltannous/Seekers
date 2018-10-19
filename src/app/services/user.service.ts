import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  signupUser(user) {
    return this.http
      .post('http://localhost:3000/api/auth/signupUser', user)
      .pipe(map((response: Response) => response));
  }

  signinUser(user) {
    return this.http
      .post('http://localhost:3000/api/auth/signinUser', user)
      .pipe(map((response: Response) => response));
  }

  updateUserProfile(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post('http://localhost:3000/api/user/updateUserProfile', user, httpOptions)
      .pipe(map((response: Response) => response));
  }

  getJobs() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .get('http://localhost:3000/api/job/getJobs', httpOptions)
      .pipe(map((response: Response) => response));
  }

  getAllJobs() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .get('http://localhost:3000/api/job/getAllJobs', httpOptions)
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

  applyToJob(jobId) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post('http://localhost:3000/api/job/applyToJob', { jobId: jobId }, httpOptions)
      .pipe(map((response: Response) => response));
  }

  getAppliedJobs() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .get('http://localhost:3000/api/job/getAppliedJobs', httpOptions)
      .pipe(map((response: Response) => response));
  }

  getAppliedCompanyProfile(companyId) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post(
        'http://localhost:3000/api/job/getAppliedCompanyProfile',
        { companyId: companyId },
        httpOptions
      )
      .pipe(map((response: Response) => response));
  }

  getUserInterviews() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .get('http://localhost:3000/api/interview/getUserInterviews', httpOptions)
      .pipe(map((response: Response) => response));
  }

  updateUserInterview(interview) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post(
        'http://localhost:3000/api/interview/updateUserInterview',
        interview,
        httpOptions
      )
      .pipe(map((response: Response) => response));
  }
}
