import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { JobseekerService } from 'src/app/Services/jobseeker.service';
import { Jobseeker } from 'src/app/Models/jobseeker';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  jobSeeker: Jobseeker;
  constructor(private jobseeeker_service: JobseekerService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.jobSeeker = new Jobseeker();
    this.initializeControls();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }
  initializeControls() {
    this.profileForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        lastName: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        email: ['', [Validators.required,Validators.email]],
        skills: ['', Validators.required],
        highestQualification: ['', Validators.required],
        workExperience: ['', Validators.required],
        nameOfInstituition: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        yearOfPassing: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(4)]]
      }
    )
  }
  BindFormControls() {

    this.jobSeeker.firstName = this.profileForm.value['firstName'];
    this.jobSeeker.lastName = this.profileForm.value['lastName'];
    this.jobSeeker.email = this.profileForm.value['email'];
    this.jobSeeker.yearOfPassing = this.profileForm.value['yearOfPassing'];
    this.jobSeeker.highestEducationalQualification = this.profileForm.value['highestQualification'];
    this.jobSeeker.workExperienceDuration = this.profileForm.value['workExperience'];
    this.jobSeeker.nameOfInstituition = this.profileForm.value['nameOfInstituition'];
    this.jobSeeker.skills = this.profileForm.value['skills'];
  }
  AddProfile() {
    this.BindFormControls();
    this.jobSeeker.userId = localStorage["userId"];
    console.log(this.jobSeeker.email);
    this.submitted=true;
    if(this.profileForm.invalid)
    {
      return;
    }
    this.jobseeeker_service.AddProfile(this.jobSeeker).subscribe(res => {
      localStorage["jobseekerProfile"] == "notCreated"
      alert("Succesfully saved!");
      this.router.navigateByUrl("/user-dashboard/jobs");
    });

  }

}
