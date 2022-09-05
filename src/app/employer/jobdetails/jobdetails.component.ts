import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/job';
import { JobsService } from 'src/app/Services/jobs.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})
export class JobdetailsComponent implements OnInit {

  job: Job = new Job();

  applyBtn:boolean;
  constructor(private job_service: JobsService,private router:Router) { }

  ngOnInit(): void {
    this.GetJobDetails();
    // this.CheckDuplicateApplication();
  }
  GetJobDetails() {
    let id = localStorage["jobId"];
    this.job_service.ViewJob(id).subscribe(res => {
      this.job = res;
      this.job.aboutCompany = localStorage["aboutCompany"];
      console.log(this.job);
    })
  }
  EditJob(jobId:number)
  {
    localStorage["jobId"]=jobId;
    console.log(localStorage["jobId"]);
    this.router.navigateByUrl("/employer-dashboard/editjob");
  }
}
