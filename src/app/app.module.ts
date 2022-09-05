import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ApplicantsComponent } from './employer/applicants/applicants.component';
import { TrackjobsComponent } from './employer/trackjobs/trackjobs.component';
import { RegisterComponent } from './Account/register/register.component';
import { LoginComponent } from './Account/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './Services/account.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { JobPostsComponent } from './User/job-posts/job-posts.component';
import { ApplicationsComponent } from './User/applications/applications.component';
import { JobDetailsComponent } from './User/job-details/job-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderNavbarComponent } from './shared/header-navbar/header-navbar.component';
import { SideNavbarComponent } from './shared/side-navbar/side-navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddProfileComponent } from './User/add-profile/add-profile.component';
import { ProfileComponent } from './User/profile/profile.component'
// Added
import { PostjobComponent } from './employer/postjob/postjob.component';
import { JobdetailsComponent } from './employer/jobdetails/jobdetails.component';
import { EmployerHeaderNavbarComponent } from './shared/employer-header-navbar/employer-header-navbar.component';
import { EmployerSideNavbarComponent } from './shared/employer-side-navbar/employer-side-navbar.component';
import { EmployerDashboardComponent } from './employer/employer-dashboard/employer-dashboard.component';
import { EmployerProfileComponent } from './employer/employer-profile/employer-profile.component';
import { EditjobComponent } from './employer/editjob/editjob.component'
import { ApplicationService } from './Services/application.service';
import { EmailService } from './Services/email.service';
import { EmployerService } from './Services/employer.service';
import { JobsService } from './Services/jobs.service';
import { JobseekerService } from './Services/jobseeker.service';
import { HttperrorinterceptorService } from './Authentication/Interceptors/httperrorinterceptor.service';
import { AuthInterceptorService } from './Authentication/Interceptors/auth-interceptor-service.service';
import { AddEmployerProfileComponent } from './employer/add-employer-profile/add-employer-profile.component';
import { UpdateEmployerProfileComponent } from './employer/update-employer-profile/update-employer-profile.component';
import { AboutComponent } from './shared/about/about.component';
import { HomeComponent } from './shared/home/home.component';
import { DatePipe } from '@angular/common';
import { ContactUsComponent } from './shared/contact-us/contact-us.component'
import { MembershipService } from './Services/membership.service';
import { MembershipPurchaseComponent } from './employer/membership-purchase/membership-purchase.component';
import { EmployerAnalyticsComponent } from './employer/employer-analytics/employer-analytics.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './Pipes/search-filter.pipe';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ManageEmployersComponent } from './admin/manage-employers/manage-employers.component';
import { ViewJobsComponent } from './admin/view-jobs/view-jobs.component';
import { EditJobsComponent } from './admin/edit-jobs/edit-jobs.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { AdminHeaderNavbarComponent } from './shared/admin-header-navbar/admin-header-navbar.component';
import { AdminSideNavbarComponent } from './shared/admin-side-navbar/admin-side-navbar.component';
import { EmailConfirmationComponent } from './Account/email-confirmation/email-confirmation.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ApplicantsComponent,
    TrackjobsComponent,
    RegisterComponent,
    LoginComponent,
    UserDashboardComponent,
    UserProfileComponent,
    JobPostsComponent,
    ApplicationsComponent,
    JobDetailsComponent,
    HeaderNavbarComponent,
    SideNavbarComponent,
    AddProfileComponent,
    ProfileComponent,
    PostjobComponent,
    JobdetailsComponent,
    EmployerHeaderNavbarComponent,
    EmployerSideNavbarComponent,
    EmployerDashboardComponent,
    EmployerProfileComponent,
    EditjobComponent,
    AddEmployerProfileComponent,
    UpdateEmployerProfileComponent,
    AboutComponent,
    HomeComponent,
    ContactUsComponent,
    MembershipPurchaseComponent,
    EmployerAnalyticsComponent,
    SearchFilterPipe,
    AdminDashboardComponent,
    ManageEmployersComponent,
    ViewJobsComponent,
    EditJobsComponent,
    ReportsComponent,
    AdminHeaderNavbarComponent,
    AdminSideNavbarComponent,
    EmailConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatProgressBarModule,
    NgChartsModule,
    NgxPaginationModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService, 
    multi: true 
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttperrorinterceptorService,
      multi: true
    },
AccountService,ApplicationService,EmailService,EmployerService,JobsService,MembershipService,DatePipe,JobseekerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
