import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { ApplicantsComponent } from './employer/applicants/applicants.component';

import { TrackjobsComponent } from './employer/trackjobs/trackjobs.component';
import { AddProfileComponent } from './User/add-profile/add-profile.component';
import { ApplicationsComponent } from './User/applications/applications.component';
import { JobDetailsComponent } from './User/job-details/job-details.component';
import { JobPostsComponent } from './User/job-posts/job-posts.component';
import { ProfileComponent } from './User/profile/profile.component';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { EmployerProfileComponent } from './employer/employer-profile/employer-profile.component';
import { PostjobComponent } from './employer/postjob/postjob.component';
import { EmployerDashboardComponent } from './employer/employer-dashboard/employer-dashboard.component';
import { EditjobComponent } from './employer/editjob/editjob.component';
import { JobdetailsComponent } from './employer/jobdetails/jobdetails.component';
import { UserGuard } from './Authentication/Guards/user.guard';
import { EmployerGuard } from './Authentication/Guards/employer.guard';
import { AddEmployerProfileComponent } from './employer/add-employer-profile/add-employer-profile.component';
import { UpdateEmployerProfileComponent } from './employer/update-employer-profile/update-employer-profile.component';
import { HomeComponent } from './shared/home/home.component';
import { MembershipPurchaseComponent } from './employer/membership-purchase/membership-purchase.component';
import { MembershipGuard } from './Authentication/Guards/membership.guard';
import { EmployerAnalyticsComponent } from './employer/employer-analytics/employer-analytics.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ManageEmployersComponent } from './admin/manage-employers/manage-employers.component';
import { ViewJobsComponent } from './admin/view-jobs/view-jobs.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { AdminGuard } from './Authentication/Guards/admin.guard';
import { AboutComponent } from './shared/about/about.component';
import { ContactUsComponent } from './shared/contact-us/contact-us.component';
import { EmailConfirmationComponent } from './Account/email-confirmation/email-confirmation.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'about-us',component:AboutComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path: 'admin-dashboard', component:AdminDashboardComponent,canActivate:[AdminGuard],
  children: [{ path :'manage-employers', component: ManageEmployersComponent}, 
  {path:'view-jobs',component: ViewJobsComponent},{path:'edit-jobs',component:EditjobComponent},
  
{path: 'reports', component: ReportsComponent}]},
  { path: 'applicants', component: ApplicantsComponent,canActivate:[MembershipGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'confirmEmail',component:EmailConfirmationComponent},
  { path: 'jobs', component: JobPostsComponent },
  { path: 'job-details', component: JobDetailsComponent },
  {path:'employer-dashboard',component:EmployerDashboardComponent,canActivate:[EmployerGuard] ,children:[{path:'postjob',component:PostjobComponent,canActivate:[MembershipGuard] },
  {path:'jobdetails',component:JobdetailsComponent,canActivate:[MembershipGuard]},{path:'membership',component:MembershipPurchaseComponent},
  {path:'editjob',component:EditjobComponent,canActivate:[MembershipGuard] },
  {path:'analytics',component:EmployerAnalyticsComponent},
  {path:'employer-profile',component:EmployerProfileComponent},
  {path:'add-employer-profile',component:AddEmployerProfileComponent},
  {path:'update-employer-profile',component:UpdateEmployerProfileComponent},
  {path:'trackjobs',component:TrackjobsComponent}
  ]},
  {
    path: 'user-dashboard', component: UserDashboardComponent,canActivate:[UserGuard], children: [{ path: 'jobs', component: JobPostsComponent },
    { path: 'profile', component: ProfileComponent }
      , { path: 'update-profile', component: UserProfileComponent },
    { path: 'add-profile', component: AddProfileComponent },
    { path: 'view-applications', component: ApplicationsComponent },
    { path: '', pathMatch: 'full', redirectTo: "view-applications" }
    ]
  },
  {path:'jobs',component:JobPostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
