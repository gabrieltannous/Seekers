import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-job-appliers',
  templateUrl: './job-appliers.component.html',
  styleUrls: ['./job-appliers.component.css']
})
export class JobAppliersComponent implements OnInit {

  jobId: string;
  applicants: any[];

  constructor(private router: ActivatedRoute, private authState: AuthService,
    private fireServ: FirebaseService, private loader: Ng4LoadingSpinnerService) {
    this.applicants = new Array();
    this.jobId = this.router.snapshot.paramMap.get('id');
    this.fireServ.getApplicants(this.jobId).subscribe(
      res => {
        res.map(
        item => {
          this.fireServ.getApplicants2(item.user).then(
            res2 => {
              this.applicants.push(res2);
            });
        });
        this.loader.hide();
      });
  }

  ngOnInit() {
    this.loader.show();
  }

  logout() {
    this.authState.logout();
  }

}
