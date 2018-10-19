import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Job } from '../../models/job';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {

  job = new Job();
  jobs: any[];
  allJobs: any[];
  constructor(private authServ: AuthService, private route: Router, private fireServ: FirebaseService,
    private loader: Ng4LoadingSpinnerService,private userServ: UserService) {
      this.loader.hide();
      this.userServ.getAllJobs().subscribe(
        res => {
          if(res["success"]){
              this.allJobs = res["jobs"];
              this.jobs = res["jobs"];
          }   
        }
      );
  }

  ngOnInit() {
  }

  search() {
    this.jobs = this.userServ
    .searchJobsWithOptions(this.allJobs, this.job.title, this.job.type, this.job.salary);
  }

  apply(job) {
    this.userServ.applyJob(job._id).subscribe(
        res => {
          if(res["success"]){
              job.applied = true;
          }
          alert(res["msg"]);  
     });
  }

  logout() {
    this.authServ.logOut();
    this.route.navigate(['/user/login']);
  }
}
