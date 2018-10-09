import { Component, ViewEncapsulation } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './auth.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {

  constructor(private router: Router, private loader: Ng4LoadingSpinnerService, private authServ: AuthService) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader.show();
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
