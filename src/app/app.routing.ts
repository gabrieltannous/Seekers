﻿import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserJobsComponent } from './users/user-jobs/user-jobs.component';
import { CompanyLoginComponent } from './companies/company-login/company-login.component';
import { CompanyProfileComponent } from './companies/company-profile/company-profile.component';
import { CompanyRegisterComponent } from './companies/company-register/company-register.component';
import { CompanyJobsComponent } from './companies/company-jobs/company-jobs.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { JobApplicantsComponent } from './companies/job-applicants/job-applicants.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { CompaniesComponent } from './admin/companies/companies.component';
import { JobsComponent } from './admin/jobs/jobs.component';
import { LoginComponent } from './admin/login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'company/login', component: CompanyLoginComponent, canActivate: [AuthGuard]},
  { path: 'company/register', component: CompanyRegisterComponent, canActivate: [AuthGuard]},
  { path: 'company/profile', component: CompanyProfileComponent, canActivate: [AuthGuard], data: {roles: ['company']} },
  { path: 'company/job-applicants/:id/all-applicants',
  component: JobApplicantsComponent, canActivate: [AuthGuard], data: {roles: ['company']} },
  { path: 'company/jobs', component: CompanyJobsComponent, canActivate: [AuthGuard], data: {roles: ['company']}  },
  { path: 'user/login', component: UserLoginComponent, canActivate: [AuthGuard]},
  { path: 'user/register', component: UserRegisterComponent, canActivate: [AuthGuard] },
  { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard], data: {roles: ['user']}  },
  { path: 'user/jobs', component: UserJobsComponent, canActivate: [AuthGuard], data: {roles: ['user']}  },
  { path: 'forgot-password', component: ForgetPasswordComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {roles: ['admin']} },
  { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard], data: {roles: ['admin']}},
  { path: 'admin/companies', component: CompaniesComponent, canActivate: [AuthGuard], data: {roles: ['admin']} },
  { path: 'admin/jobs', component: JobsComponent, canActivate: [AuthGuard], data: {roles: ['admin']} },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roles: ['user', 'company']} },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
