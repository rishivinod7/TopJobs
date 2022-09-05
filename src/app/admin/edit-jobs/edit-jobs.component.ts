import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Job } from 'src/app/job';
import { JobsService } from 'src/app/Services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-jobs',
  templateUrl: './edit-jobs.component.html',
  styleUrls: ['./edit-jobs.component.css']
})
export class EditJobsComponent implements OnInit {
  job: Job = new Job();

  constructor(private job_service: JobsService, private router: Router) { }

  ngOnInit(): void {
    this.GetJobDetails();
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
  Details(){
    this.router.navigateByUrl("/admin-dashboard/manage-employers/view-jobs/edit-jobs/");
  }
}
