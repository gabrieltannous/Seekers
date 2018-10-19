import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserAppliesComponent } from './users/user-applies/user-applies.component';
import { CompanyLoginComponent } from './companies/company-login/company-login.component';
import { CompanyProfileComponent } from './companies/company-profile/company-profile.component';
import { CompanyRegisterComponent } from './companies/company-register/company-register.component';
import { CompanyJobsComponent } from './companies/company-jobs/company-jobs.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { JobApplicantsComponent } from './companies/job-applicants/job-applicants.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { UserInterviewsComponent } from './users/user-interviews/user-interviews.component';
import { CompanyInterviewsComponent } from './companies/company-interviews/company-interviews.component';
import { UserComponent } from './companies/user/user.component';
import { CompanyComponent } from './users/company/company.component';
import { JobSearchComponent } from './users/job-search/job-search.component';

const appRoutes: Routes = [
  // Index page
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },

  // Companies pages
  { path: 'company/login', component: CompanyLoginComponent, canActivate: [AuthGuard]},
  { path: 'company/register', component: CompanyRegisterComponent, canActivate: [AuthGuard]},
  { path: 'company/profile', component: CompanyProfileComponent, canActivate: [AuthGuard], data: {roles: ['company']} },
  { path: 'company/interviews', component: CompanyInterviewsComponent, canActivate: [AuthGuard], data: {roles: ['company']} },
  { path: 'company/job/:id/all-applicants',
  component: JobApplicantsComponent, canActivate: [AuthGuard], data: {roles: ['company']} },
  { path: 'company/user/:id/profile',
  component: UserComponent, canActivate: [AuthGuard], data: {roles: ['company']} },
  { path: 'company/jobs', component: CompanyJobsComponent, canActivate: [AuthGuard], data: {roles: ['company']}  },

  // Users pages
  { path: 'user/login', component: UserLoginComponent, canActivate: [AuthGuard]},
  { path: 'user/register', component: UserRegisterComponent, canActivate: [AuthGuard]},
  { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard], data: {roles: ['user']}  },
  { path: 'user/applies', component: UserAppliesComponent, canActivate: [AuthGuard], data: {roles: ['user']}  },
  { path: 'user/search', component: JobSearchComponent, canActivate: [AuthGuard], data: {roles: ['user']}  },
  { path: 'user/interviews', component: UserInterviewsComponent, canActivate: [AuthGuard], data: {roles: ['user']}  },
  { path: 'user/company/:id/profile', component: CompanyComponent, canActivate: [AuthGuard], data: {roles: ['user']} },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roles: ['user', 'company']} },
  { path: '**', redirectTo: 'user/login' }
];

export const routing = RouterModule.forRoot(appRoutes);
