import { Component, OnInit } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  // isUser = false;
  // isCompany: boolean;
  // isAuth: boolean;

  // constructor(private authState: AuthService) {
  //   console.log('inside cons');
  // }

  // ngOnInit() {
  //   this.isAuth = this.authState.isLoggedIn();
  //   console.log('inside init');
  // }

  // logout() {
  //   this.authState.logout();
  // }

  loading = true;

  constructor(private router: Router, private loader: Ng4LoadingSpinnerService) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader.show();
    }
    if (event instanceof NavigationEnd) {
      this.loader.hide();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loader.hide();
    }
    if (event instanceof NavigationError) {
      this.loader.hide();
    }
  }
}
