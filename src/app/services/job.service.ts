import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apply } from '../models/apply';

@Injectable()
export class JobService {
  constructor(private http: HttpClient) {}

  saveJob(job) {
    return this.http
      .post('http://localhost:3000/api/SaveJob/', job)
      .pipe(map((response: Response) => response));
  }

  apply(jobId, userId) {
    const apply = new Apply();
    apply.jobId = jobId;
    apply.userId = userId;
    return this.http
      .post('http://localhost:3000/api/applyToJob/', apply)
      .pipe(map((response: Response) => response));
  }

  GetJobs() {
    return this.http
      .get('http://localhost:3000/api/getJobs/')
      .pipe(map((response: Response) => response));
  }

  GetAppliedJobs(userId) {
    return this.http
      .get('http://localhost:3000/api/getAppliedJobs/', {params: {userId: userId}})
      .pipe(map((response: Response) => response));
  }
}
