import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/Services/jobs.service';
import { Router } from '@angular/router';
import { Job } from 'src/app/job';
import { from } from 'rxjs';
import { Employer } from 'src/app/Models/employer';
import { EmployerSideNavbarComponent } from 'src/app/shared/employer-side-navbar/employer-side-navbar.component';
import { JobDetailsComponent } from 'src/app/User/job-details/job-details.component';
import { MembershipService } from 'src/app/Services/membership.service';
import { Membership } from 'src/app/Models/membership';
import { ApplicationService } from 'src/app/Services/application.service';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {

  constructor(private jobsService: JobsService,private application_service:ApplicationService,private mebership_service:MembershipService, private router: Router,) { }
  jobs: Job[];
  companyName: string;
membership:Membership;
page:number=1;
size:number;
  

  ngOnInit(): void {
    this.ViewJobsByEmployerId();
  }
 
   handlePageChange(event)
  {
    this.page=event;
  } 
  ViewJobsByEmployerId() {

    this.companyName=localStorage["companyName"]
    this.jobsService.ViewJobsByEmployerId(localStorage["employerId"]).subscribe(res => {
      this.jobs = res;
    });
    this.mebership_service.GetMembershipStatus(localStorage["employerId"]).subscribe(res1=>
      {
        this.membership=res1;
        console.log(this.membership);
      })
  }
  EditJob(jobId: number) {
    localStorage["jobId"] = jobId


    this.router.navigateByUrl("/admin-dashboard/edit-jobs");


  }
  DeleteJob(jobId: number) {
    localStorage["jobId"] = jobId
    this.jobsService.DeleteJob(localStorage["jobId"]).subscribe(res=>
      {
        alert("Job deleted succesfully!");
        this.application_service.DeleteApplicationsByJobId(localStorage["jobId"]).subscribe(res1=>
          {
            console.log("deleted");
          });
        this.ViewJobsByEmployerId();
        // location.reload();
      })

  }


}
