import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches)
  //   );
  // isAuth: Observable<boolean> = this.breakpointObserver.observe(this.authServ.isLoggedIn())
  // .pipe(
  //   map(result => result.matches)
  // );
  // isUser: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  // .pipe(
  //   map(result => result.matches)
  // );
  // isCompany: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches)
  //   );

  constructor(private breakpointObserver: BreakpointObserver, private authServ: AuthService) {

  }

  logout() {
  }
}
