import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}

  createCompany(company) {
    return this.http
      .post('http://localhost:3000/api/CreateCompany/', company)
      .pipe(map((response: Response) => response));
  }

  updateCompany(company) {
    return this.http
      .post('http://localhost:3000/api/UpdateCompany/', company)
      .pipe(map((response: Response) => response));
  }

  GetCompany(company) {
    return this.http
      .get('http://localhost:3000/api/getCompany', {
        params: { email: company.email }
      })
      .pipe(map((response: Response) => response));
  }

  isCompany(email) {
    return this.http
      .get('http://localhost:3000/api/isCompany', { params: { email: email } })
      .pipe(map((response: Response) => response));
  }

  GetAllCompanies() {
    return this.http
      .get('http://localhost:3000/api/getAllCompanies/')
      .pipe(map((response: Response) => response));
  }

  deleteCompany(id) {
    return this.http
      .post('http://localhost:3000/api/deleteCompany/', { id: id })
      .pipe(map((response: Response) => response));
  }
}
