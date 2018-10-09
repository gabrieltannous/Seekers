import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();

  constructor(private authServ: AuthService, public fireServ: FirebaseService, private route: Router,
    private loader: Ng4LoadingSpinnerService, private router: ActivatedRoute) {
      const userId = this.router.snapshot.paramMap.get('id');
    this.fireServ.getUser(userId).then(
      res => {
      this.user = res;
        this.loader.hide();
      });
  }

  ngOnInit() {
  }

  logout() {
    this.authServ.logout().then(() => this.route.navigate(['/company/login']));
  }


}
