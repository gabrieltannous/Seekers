import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { CompanyLoginComponent } from './companies/company-login/company-login.component';
import { CompanyProfileComponent } from './companies/company-profile/company-profile.component';
import { CompanyRegisterComponent } from './companies/company-register/company-register.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { HomeComponent } from './home/home.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { CompanyJobsComponent } from './companies/company-jobs/company-jobs.component';
import { UserAppliesComponent } from './users/user-applies/user-applies.component';
import { JobApplicantsComponent } from './companies/job-applicants/job-applicants.component';
import { UserInterviewsComponent } from './users/user-interviews/user-interviews.component';
import { CompanyInterviewsComponent } from './companies/company-interviews/company-interviews.component';
import { UserComponent } from './companies/user/user.component';
import { CompanyComponent } from './users/company/company.component';
import { JobSearchComponent } from './users/job-search/job-search.component';
import { CompanyService } from './services/company.service';
import { UserService } from './services/user.service';

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
    CompanyJobsComponent,
    UserAppliesComponent,
    JobApplicantsComponent,
    UserInterviewsComponent,
    CompanyInterviewsComponent,
    UserComponent,
    CompanyComponent,
    JobSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    Ng4LoadingSpinnerModule.forRoot(),
    LayoutModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CompanyService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
