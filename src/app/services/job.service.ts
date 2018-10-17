import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class JobService {
  constructor(private http: HttpClient) {}

  saveJob(job) {
    return this.http
      .post('http://localhost:3000/api/SaveJob/', job)
      .pipe(map((response: Response) => response));
  }

  apply(apply) {
    return this.http
      .post('http://localhost:3000/api/apply/', apply)
      .pipe(map((response: Response) => response));
  }

  GetJobs() {
    return this.http
      .get('http://localhost:3000/api/getJobs/')
      .pipe(map((response: Response) => response));
  }
}
