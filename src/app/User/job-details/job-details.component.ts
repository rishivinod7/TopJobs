import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/job';
import { JobsService } from 'src/app/Services/jobs.service';
import { EmployerService } from 'src/app/Services/employer.service';
import { ApplicationService } from 'src/app/Services/application.service';
import { Application } from 'src/app/Models/application';
import { Router } from '@angular/router';
import { Email } from 'src/app/Models/email';
import { EmailService } from 'src/app/Services/email.service';
import { HttpClient } from '@angular/common/http';
import{FileInfo} from 'src/app/Models/file-info';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  job: Job = new Job();
  application: Application = new Application();
  email: Email = new Email();
  applications: Application[];
  applyBtn: boolean;
  file: any=null;
  fileData:FileInfo=new FileInfo();
  constructor(private job_service: JobsService,private http:HttpClient, private email_service: EmailService, private router: Router, private employer_service: EmployerService, private application_service: ApplicationService) { }

  ngOnInit(): void {
    this.GetJobDetails();
    // this.CheckDuplicateApplication();
  }
  GetJobDetails() {
    let id = localStorage["jobId"];
    this.job_service.ViewJob(id).subscribe(res => {
      this.job = res;
      this.job.aboutCompany = localStorage["aboutCompany"];
      this.job.companyName = localStorage["companyName"];
      console.log(this.job);
    })
  }
  selectFile(event) {
    this.file = event.target.files[0];
    console.log(event.target.files[0].name);
  }

  ApplyJob() {
    this.CheckDuplicateApplication();
    this.application.jobId = this.job.jobId;
    if (localStorage["userId"] == null || localStorage["userId"] == undefined) {
      alert(" Please Login to apply");
      let ref = document.getElementById("close");
      ref?.click();
      this.router.navigateByUrl("/login");
    }
    else if(this.file==null)
    {
      alert("Please upload your resume");
    }
    else {
      if (localStorage["jobSeekerId"] != null || localStorage["jobSeekerId"] != undefined) {
        this.application.applicantId = localStorage["jobSeekerId"];
        this.application.applicationStatus = "Under Review";
        //13 march addition
        console.log(this.file.name);
        let formData = new FormData();
        formData.append('file', this.file, localStorage["jobSeekerId"] + this.file.name.slice(-4));
        console.log(formData.get('file'));
        console.log(formData.getAll('file'));

        this.http.post<any>(environment.fileupload_api, formData, { headers: { 'Anonymous': '' } }).subscribe(
          res => {
            // alert("Uploaded!");
            console.log(res);
            this.fileData=res;
            this.application.resume=this.fileData.fileName;
            this.application_service.ApplyJob(this.application).subscribe(res => {
              this.email.toEmail = localStorage["emailId"];
              this.email.subject = "Job Application succesfully submitted";
              this.email.body = "You have succesfully applied for " + this.job.jobTitle + " at " + this.job.companyName + " .Stay tuned for updates";
              this.email_service.SendEmail(this.email).subscribe(res => {
                console.log("sent to jobseeker");
              })
              let ref = document.getElementById("close");
    
              alert("Application Submitted Succesfully!");
              ref?.click();
              this.router.navigateByUrl("/user-dashboard/view-applications")
            })
          }
        )



        //end
        
      }
      else {
        let ref = document.getElementById("close");
        alert("Please fill your profile details before!");
        ref?.click();
        this.router.navigateByUrl("/user-dashboard/add-profile")

      }
    }
  }
  CheckDuplicateApplication() {
    this.application_service.CheckDuplicateApplication(this.job.jobId).subscribe(res => {
      this.applications = res;
      console.log(this.applications);
      console.log("jobid" + this.job.jobId);
      this.applications.forEach(element => {
        if (element.applicantId == localStorage["jobSeekerId"]) {
          this.applyBtn = true;
        }
        else {
          this.applyBtn = false;
        }
      });
    });
    console.log(this.applyBtn);
  }
  backToJobs() {
    this.router.navigateByUrl("/user-dashboard/jobs");
  }
}
