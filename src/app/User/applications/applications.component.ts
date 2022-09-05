import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/Services/application.service';
import { Application } from 'src/app/Models/application';
import { JobsService } from 'src/app/Services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private application_service: ApplicationService, private job_service: JobsService, private router: Router) { }
  applications: Application[];
  page:number=1;
  size:number;

  ngOnInit(): void {
    this.ViewAllApplications();
  }
  handlePageChange(event)
  {
    this.page=event;
  }
  ViewAllApplications() {
    console.log("jobseeeker" + localStorage["jobSeekerId"]);
    let id = localStorage["jobSeekerId"];
    this.application_service.GetAllUserApplications(id).subscribe(res => {
      this.applications = res;
      this.size=this.applications.length;
      this.applications.forEach(element => {
        this.job_service.ViewJob(element.jobId).subscribe(res => {
          element.companyName = res.companyName;
          element.jobTitle = res.jobTitle;
        })
        if (element.applicationStatus == "Under Review") {
          element.progress = 0.25;
          element.classValue = "progress-bar";
        }
        else if (element.applicationStatus == "Shortlisted") {
          element.progress = 0.40;
          element.classValue = "progress-bar bg-warning";
        }
        else if (element.applicationStatus == "Approved") {
          element.progress = 1;
          element.classValue = "progress-bar bg-success";
        }
        else if (element.applicationStatus == "Rejected") {
          element.progress = 1;
          element.classValue = "progress-bar bg-danger";
        }
      });
      console.log(this.applications);
    })
  }
  ViewJobDetails(jobId: number) {
    localStorage["jobId"] = jobId;
    this.router.navigateByUrl("/job-details");
  }

}
