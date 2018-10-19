import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}

  signupCompany(company) {
    return this.http
      .post('http://localhost:3000/api/auth/signupCompany', company)
      .pipe(map((response: Response) => response));
  }

  signinCompany(company) {
    return this.http
      .post('http://localhost:3000/api/auth/signinCompany', company)
      .pipe(map((response: Response) => response));
  }

  updateCompanyProfile(company) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post(
        'http://localhost:3000/api/company/updateCompanyProfile',
        company,
        httpOptions
      )
      .pipe(map((response: Response) => response));
  }

  addCompanyJob(job) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post('http://localhost:3000/api/job/addCompanyJob', job, httpOptions)
      .pipe(map((response: Response) => response));
  }

  getAllCompanyJobs() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .get('http://localhost:3000/api/job/getAllCompanyJobs', httpOptions)
      .pipe(map((response: Response) => response));
  }

  getApplicants(jobId) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post(
        'http://localhost:3000/api/job/getApplicants',
        { jobId: jobId },
        httpOptions
      )
      .pipe(map((response: Response) => response));
  }

  getApplicantProfile(userId) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post(
        'http://localhost:3000/api/job/getApplicantProfile',
        { userId: userId },
        httpOptions
      )
      .pipe(map((response: Response) => response));
  }

  setInterview(interview) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .post('http://localhost:3000/api/interview/setInterview', interview, httpOptions)
      .pipe(map((response: Response) => response));
  }

  getCompanyInterviews() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    };
    return this.http
      .get('http://localhost:3000/api/interview/getCompanyInterviews', httpOptions)
      .pipe(map((response: Response) => response));
  }
}
