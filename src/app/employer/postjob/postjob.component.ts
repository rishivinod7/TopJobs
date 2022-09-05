import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from 'src/app/job';
import { JobsService } from 'src/app/Services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {
  profileForm:FormGroup;
  saveBtn:string;
  updateBtn:string;
  job : Job;
  submitted=false;

  constructor(private jobService:JobsService,private router:Router, private formBuilder:FormBuilder) { }
  onSubmit(form: any) {
    console.log(form.value);
  }
  ngOnInit(): void {
    this.job=new Job();
    this.profileForm=this.formBuilder.group(
      {
        title:['',Validators.required],
        salary:['',Validators.required],
        location:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        category:['',Validators.required],
        validTill:['',Validators.required],
        experience:['',Validators.required],
        description:['',Validators.required],
        jobType:['',Validators.required]
      }
    )
  }
  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  BindFormControls()
  {
    this.job.jobTitle=this.profileForm.value['title'];
    this.job.salary=this.profileForm.value['salary'];
    this.job.category=this.profileForm.value['category'];
    this.job.location=this.profileForm.value['location'];
    this.job.jobDescription=this.profileForm.value['description'];
    this.job.requiredExperience=this.profileForm.value['experience'];
    this.job.validTill=this.profileForm.value['validTill'];
    this.job.jobType=this.profileForm.value['jobType'];

  }
  AddJob()
  {
   
    this.BindFormControls();
    this.job.employerId=localStorage["employerId"];
    console.log(this.job.jobTitle);
    this.job.postedOn =new Date();
    this.submitted=true;
    if(this.profileForm.invalid)
    {
      return;
    }

    this.jobService.PostJob(this.job).subscribe(res=>
      {
        alert("Succesfully saved!");
        this.router.navigateByUrl("/employer-dashboard/trackjobs")
      })
  }

  // UpdateJob()
  // {
  // this.BindFormControls();
  //   console.log(this.job);
  //   this.jobService.UpdateJob(this.job).subscribe(
  //     res=>{
  //       alert("Updated Succesfully");
  //     }
  //   )
  // }
 
}
