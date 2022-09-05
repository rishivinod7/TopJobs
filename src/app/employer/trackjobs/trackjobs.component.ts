import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/job';
import { Application } from 'src/app/Models/application';
import { Employer } from 'src/app/Models/employer';
import { Membership } from 'src/app/Models/membership';
import { ApplicationService } from 'src/app/Services/application.service';
import { EmployerService } from 'src/app/Services/employer.service';
import { JobsService } from 'src/app/Services/jobs.service';
import { MembershipService } from 'src/app/Services/membership.service';

@Component({
  selector: 'app-trackjobs',
  templateUrl: './trackjobs.component.html',
  styleUrls: ['./trackjobs.component.css']
})
export class TrackjobsComponent implements OnInit {
job= new Job();
jobs :Job[]=[];
employer:Employer = new Employer();
page:number=1;
size:number;

membership:Membership=new Membership();
date:Date=new Date();

ngOnInit(): void {
  
  this.ViewJobs();
  const reload=localStorage.getItem("reloadKey");
  if(!reload)
  {
    console.log(localStorage.getItem("reloadKey"));
    localStorage.setItem("reloadKey","reloaded");
    window.location.reload();
  }
  else
  {
    console.log(localStorage.getItem("reloadKey"));
    localStorage.removeItem("reloadKey");
  }


}
constructor(private datePipe:DatePipe,private application_service:ApplicationService,private jobService:JobsService,private router:Router,private membership_service:MembershipService,private empService:EmployerService) {
    
   }




  getEmployer(){
    let uid = localStorage["userId"];
    console.log(this.employer);
    this.empService.GetEmployerInfoByUserId(uid).subscribe(res=>{
      this.employer=res;
      
      localStorage["employerId"] = this.employer.employerId;
      localStorage["organisationName"] = this.employer.organizationName;
      this.membership_service.GetMembershipStatus(this.employer.employerId).subscribe(
        res1=>
        {
          this.membership=res1;
          console.log(res1);
          console.log(this.datePipe.transform(this.membership.endDate,'yyyy-MM-dd')+"membership"+this.datePipe.transform(this.date,'yyyy-MM-dd'));
          if(this.datePipe.transform(this.membership.endDate,'yyyy-MM-dd')>=this.datePipe.transform(this.date,'yyyy-MM-dd'))
          {
            console.log("active");
            localStorage["memberShipStatus"]="active";
          }
          else
          {
            console.log("inactive");
            localStorage["memberShipStatus"]="inactive";
          }
        }
      );

      
    });
    console.log(this.employer);


  }
  handlePageChange(event)
  {
    this.page=event;
  } 
  ViewJobs()
  {

    this.getEmployer();
    this.jobService.ViewJobsByEmployerId(localStorage["employerId"]).subscribe(res=>{
      this.jobs=res;
      this.size=this.jobs.length;
      localStorage["jobCount"]=res.length;
      console.log(this.jobs);
      console.log(localStorage["memberShipStatus"]);
    })
    this.membership_service.ViewMemberShipsByEmployer(localStorage["employerId"]).subscribe(res1=>
      {
        localStorage["memberShipCount"]=res1.length;
      })
  }
  ViewJob(jobId:number)
  {
    localStorage["jobId"]=jobId;
    // console.log(localStorage["jobId"]);
    this.router.navigateByUrl("/employer-dashboard/jobdetails");
  }
 

  ViewApplicants(jobId:number){
    localStorage["jobId"] = jobId;
    this.router.navigateByUrl("/applicants");


  }

}
