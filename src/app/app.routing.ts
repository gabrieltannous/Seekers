import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserJobsComponent } from './users/user-jobs/user-jobs.component';
import { CompanyLoginComponent } from './companies/company-login/company-login.component';
import { CompanyProfileComponent } from './companies/company-profile/company-profile.component';
import { CompanyRegisterComponent } from './companies/company-register/company-register.component';
import { CompanyJobsComponent } from './companies/company-jobs/company-jobs.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { JobAppliersComponent } from './companies/job-appliers/job-appliers.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'company/login', component: CompanyLoginComponent},
  { path: 'company/register', component: CompanyRegisterComponent },
  { path: 'company/profile', component: CompanyProfileComponent, canActivate: [AuthGuard], data: {roles: ['company']} },
  { path: 'company/job-appliers/:id/all-applicants',
  component: JobAppliersComponent, canActivate: [AuthGuard], data: {roles: ['company']} },
  { path: 'company/jobs', component: CompanyJobsComponent, canActivate: [AuthGuard], data: {roles: ['company']}  },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard], data: {roles: ['user']}  },
  { path: 'user/jobs', component: UserJobsComponent, canActivate: [AuthGuard], data: {roles: ['user']}  },
  { path: 'forgot-password', component: ForgetPasswordComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roles: [' ']} },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
