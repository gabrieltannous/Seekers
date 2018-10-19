import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CompanyService {
  
  constructor(private http: HttpClient) {}
  
  signupCompany(company) {
    return this.http
      .post('http://localhost:3000/api/signupCompany', company)
      .pipe(map((response: Response) => response));
  }

  signinCompany(company) {
    return this.http
      .post('http://localhost:3000/api/signinCompany', company)
      .pipe(map((response: Response) => response));
  }

  updateCompanyProfile(company) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http
      .post('http://localhost:3000/api/updateCompanyProfile', company,httpOptions)
      .pipe(map((response: Response) => response));
  }

  addCompanyJob(job) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http
      .post('http://localhost:3000/api/addCompanyJob', job,httpOptions)
      .pipe(map((response: Response) => response));
  }

  getAllCompanyJobs() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http
      .get('http://localhost:3000/api/getAllCompanyJobs',httpOptions)
      .pipe(map((response: Response) => response));
  }
  // updateCompany(company) {
  //   return this.http
  //     .post('http://localhost:3000/api/UpdateCompany/', company)
  //     .pipe(map((response: Response) => response));
  // }

  // GetCompany(company) {
  //   return this.http
  //     .get('http://localhost:3000/api/getCompany', {
  //       params: { email: company.email }
  //     })
  //     .pipe(map((response: Response) => response));
  // }

  // isCompany(email) {
  //   return this.http
  //     .get('http://localhost:3000/api/isCompany', { params: { email: email } })
  //     .pipe(map((response: Response) => response));
  // }

  // GetAllCompanies() {
  //   return this.http
  //     .get('http://localhost:3000/api/getAllCompanies/')
  //     .pipe(map((response: Response) => response));
  // }

  // deleteCompany(id) {
  //   return this.http
  //     .post('http://localhost:3000/api/deleteCompany/', { id: id })
  //     .pipe(map((response: Response) => response));
  // }
}