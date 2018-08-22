import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CompanyLoginComponent } from './companies/company-login/company-login.component';
import { CompanyProfileComponent } from './companies/company-profile/company-profile.component';
import { CompanyRegisterComponent } from './companies/company-register/company-register.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';

const appRoutes: Routes = [
  { path: 'company/login', component: CompanyLoginComponent },
  { path: 'company/register', component: CompanyRegisterComponent },
  { path: 'company/:id/profile', component: CompanyProfileComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/:id/profile', component: UserLoginComponent },
  /*{
    path: 'heroes', component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    CompanyLoginComponent,
    CompanyProfileComponent,
    CompanyRegisterComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase, 'Seekers'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
