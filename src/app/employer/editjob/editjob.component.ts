import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Job } from 'src/app/job';
import { JobsService } from 'src/app/Services/jobs.service';

@Component({
  selector: 'app-editjob',
  templateUrl: './editjob.component.html',
  styleUrls: ['./editjob.component.css']
})
export class EditjobComponent implements OnInit {
  profileForm: FormGroup;
  job: Job;
  readOnlyFlag:boolean;
  submitted=false;
  date=new Date();
  constructor(private jobService: JobsService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.job = new Job();
    this.profileForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        location: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        ctc: ['', Validators.required],
        category: ['', Validators.required],
        experience: ['', Validators.required],
        validTill: ['', Validators.required],
        jobType:['',Validators.required],
        description: ['', Validators.required]
      }
    )
    this.FindJob();
    if(localStorage["role"]=="Employer")
    {
      this.readOnlyFlag=false;
    }
    else if(localStorage["role"]=="Admin")
    {
      this.readOnlyFlag=true;
    }
  }
  BindFormControls() {
    this.job.jobTitle = this.profileForm.value['title'];
    this.job.salary = this.profileForm.value['ctc'];
    this.job.location = this.profileForm.value['location'];
    this.job.jobDescription = this.profileForm.value['description'];
    this.job.category = this.profileForm.value['category'];
    this.job.requiredExperience = this.profileForm.value['experience'];
    this.job.validTill = this.profileForm.value['validTill'];
    this.job.jobType=this.profileForm.value['jobType'];
  }
  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  FindJob() {
    let jobId: number = localStorage["jobId"];
    console.log(jobId);
    this.jobService.ViewJob(jobId).subscribe(res => {
      this.job = res;
      this.profileForm.patchValue(
        {
          'title': this.job.jobTitle,
          'category': this.job.category,
          'location': this.job.location,
          'ctc': this.job.salary,
          'experience': this.job.requiredExperience,
          'validTill': this.job.validTill,
          'description': this.job.jobDescription,
          'jobType':this.job.jobType
        }
      );
      localStorage["jobId"] = this.job.jobId;
      console.log(this.job.jobId);

      console.log(this.job);
    }
    )
  }
  UpdateJob() {

    this.BindFormControls();
    console.log(this.job);
    this.submitted=true;
    if(this.profileForm.invalid)
    {
      return;
    }

    this.jobService.UpdateJob(this.job).subscribe(
      res => {
        alert("Updated Succesfully");
        if (localStorage["role"] == "Admin") {
          this.router.navigateByUrl("/admin-dashboard/view-jobs")
        }
        else if (localStorage["role"] == "Employer") {
          this.router.navigateByUrl("/employer-dashboard/trackjobs")
        }
      }
    )
  }

}
