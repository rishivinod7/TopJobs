import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/Services/jobs.service';
import { Job } from 'src/app/job';
import { Employer } from 'src/app/Models/employer';
import { EmployerService } from 'src/app/Services/employer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.component.html',
  styleUrls: ['./job-posts.component.css']
})
export class JobPostsComponent implements OnInit {
  
  jobs: Job[];
  filteredJobs:Job[];
  employer: Employer;
  constructor(private job_service: JobsService, private employer_service: EmployerService, private router: Router) { }
  page:number=1;
  size:number;
  filterSize:number;
  

  searchTerm:string;
  query:string;

  ngOnInit(): void {
    this.employer = new Employer();
    this.ViewJobs();
    const reload=localStorage.getItem("reloadKey");
    if(!reload)
    {
      console.log(localStorage.getItem("reloadKey"));
      localStorage.setItem("reloadKey","reloaded");
      location.reload();
    }
    else
    {
      console.log(localStorage.getItem("reloadKey"));
      localStorage.removeItem("reloadKey");
    }

  }

  ViewJobs() {
    this.job_service.ViewJobs().subscribe(res => {
      this.jobs = res;
      this.size = this.jobs.length;
      
      console.log(this.jobs);
 
      localStorage["jobsCount"]=this.jobs.length;
      console.log(res);
      this.jobs.forEach(element => {
        this.employer_service.GetEmployerInfo(element.employerId).subscribe(res => {
          element.companyName = res.organizationName;
          localStorage["aboutCompany"] = res.description;
        })

      });

    })
  }
  ViewJob(jobId: number,companyName:string) {
    localStorage["jobId"] = jobId;
    localStorage["companyName"]=companyName;
    // console.log(localStorage["jobId"]);
    this.router.navigateByUrl("/job-details");
  }
  handlePageChange(event)
  {
    this.page=event;
  }
  search(): void {
    this.query=this.searchTerm;
    if(this.searchTerm==null)
    {
      this.query==null;
    }
    this.filteredJobs = this.jobs.filter((val) => val.jobTitle.toLowerCase().includes(this.query));
    this.filterSize = this.filteredJobs.length;
  }
  
  key='id';
  reverse:boolean=false;
  sort(key)
  {
    this.key=key;
    this.reverse=!this.reverse;
  }

}
