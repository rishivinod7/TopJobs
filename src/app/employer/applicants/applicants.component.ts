import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/job';
import { Jobseeker } from 'src/app/Models/jobseeker';
import { JobseekerService } from 'src/app/Services/jobseeker.service';
import { Application } from 'src/app/Models/application';
import { ApplicationService } from 'src/app/Services/application.service';
import { Router } from '@angular/router';
import { Email } from 'src/app/Models/email';
import { EmailService } from 'src/app/Services/email.service';
@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
applicant:Application;
seeker:Jobseeker;
status:string;
page:number=1;
size:number;
//reason changes
reason:string;
//
applications:Application[];
email:Email=new Email();


  constructor(private applicationService:ApplicationService,private email_service:EmailService,private jobseekerService:JobseekerService,private router:Router) {
 
   }

  ngOnInit(): void {
    this.viewApplicants();

 
  }

  viewApplicants(){
    this.applicationService.CheckDuplicateApplication(localStorage["jobId"]).subscribe(res=>{
      this.applications=res;
      console.log(this.applications);
      this.applications.forEach(element => {
        this.jobseekerService.GetProfile(element.applicantId).subscribe(res=>{
          this.seeker=res;
          element.applicantName = this.seeker.firstName+" "+this.seeker.lastName;
        })
      });
      
    })
  }

  Save(){
      console.log(this.status);

      this.applicant.applicationStatus=this.status;
      //reason changes
      this.applicant.reason=this.reason;
      //
      console.log(this.applicant.applicationStatus);
      this.applicationService.UpdateApplication(this.applicant).subscribe(res2=>{
        this.email.toEmail=localStorage["applicantEmail"];
        this.email.subject="Your application has been "+this.applicant.applicationStatus;
        this.email.body="Your application has been "+this.applicant.applicationStatus;
        this.email_service.SendEmail(this.email).subscribe(res=>
          {
            
          })
        let ref=document.getElementById("close");
        alert("Status Updated Succesfully!");
        ref?.click();
      });
  

    
  }
  GetByApplicationId(appId:number){
    this.applicationService.GetApplication(appId).subscribe(res=>{
       this.applicant=res;
       this.jobseekerService.GetProfile(this.applicant.applicantId).subscribe(
         res=>{
           console.log(this.applicant.applicantId);
          console.log(res.email);
          localStorage["applicantEmail"]=res.email;
         }
       )
    });
  }
  backToJobs()
  {
    this.router.navigateByUrl("/employer-dashboard/trackjobs");
  }
  handlePageChange(event)
  {
    this.page=event;
  } 
}
