import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { routing } from './app.routing';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { CompanyLoginComponent } from './companies/company-login/company-login.component';
import { CompanyProfileComponent } from './companies/company-profile/company-profile.component';
import { CompanyRegisterComponent } from './companies/company-register/company-register.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { CompanyJobsComponent } from './companies/company-jobs/company-jobs.component';
import { UserAppliesComponent } from './users/user-applies/user-applies.component';
import { JobApplicantsComponent } from './companies/job-applicants/job-applicants.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { CompaniesComponent } from './admin/companies/companies.component';
import { JobsComponent } from './admin/jobs/jobs.component';
import { LoginComponent } from './admin/login/login.component';
import { UserInterviewsComponent } from './users/user-interviews/user-interviews.component';
import { CompanyInterviewsComponent } from './companies/company-interviews/company-interviews.component';
import { InterviewsComponent } from './admin/interviews/interviews.component';
import { UserComponent } from './companies/user/user.component';
import { CompanyComponent } from './users/company/company.component';
import { JobSearchComponent } from './users/job-search/job-search.component';
import { UsersJobsComponent } from './users/users-jobs/users-jobs.component';
import { UserPComponent } from './users/user/user.component';
import { UserService } from './services/user.service';
import { JobService } from './services/job.service';
import { CompanyService } from './services/company.service';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    UserRegisterComponent,
    CompanyLoginComponent,
    CompanyProfileComponent,
    CompanyRegisterComponent,
    HomeComponent,
    ForgetPasswordComponent,
    CompanyJobsComponent,
    UserAppliesComponent,
    JobApplicantsComponent,
    DashboardComponent,
    UsersComponent,
    CompaniesComponent,
    JobsComponent,
    LoginComponent,
    UserInterviewsComponent,
    InterviewsComponent,
    CompanyInterviewsComponent,
    UserComponent,
    CompanyComponent,
    JobSearchComponent,
    UsersJobsComponent,
    UserPComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize firebase with the config placed in enviroment.ts
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    Ng4LoadingSpinnerModule.forRoot(),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    LayoutModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CompanyService,
    JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
