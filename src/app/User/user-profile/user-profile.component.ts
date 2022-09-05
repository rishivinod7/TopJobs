import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { JobseekerService } from 'src/app/Services/jobseeker.service';
import { Jobseeker } from 'src/app/Models/jobseeker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  jobSeeker: Jobseeker;
  saveBtn: string;
  updateBtn: string;
  test: string;
  submitted: boolean = false;

  constructor(private jobseeeker_service: JobseekerService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.jobSeeker = new Jobseeker();
    this.initializeControls();
    this.FindProfile();
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

  FindProfile() {
    let userId: number = localStorage["userId"];
    console.log(userId);
    this.jobseeeker_service.FindProfile(userId).subscribe(res => {
      this.jobSeeker = res;
      if (this.jobSeeker != null) {
        this.profileForm.patchValue(
          {
            'firstName': this.jobSeeker.firstName,
            'lastName': this.jobSeeker.lastName,
            'email': this.jobSeeker.email,
            'yearOfPassing': this.jobSeeker.yearOfPassing,
            'workExperience': this.jobSeeker.workExperienceDuration,
            'highestQualification': this.jobSeeker.highestEducationalQualification,
            'nameOfInstituition': this.jobSeeker.nameOfInstituition,
            'skills': this.jobSeeker.skills
          }
        );
        localStorage["jobSeekerId"] = this.jobSeeker.jobSeekerId;
        console.log(this.jobSeeker.jobSeekerId);
        this.saveBtn = "hidden";
        this.updateBtn = "visible";
        console.log(this.jobSeeker);
      }
      else {
        this.saveBtn = "visible";
        this.updateBtn = "hidden";
        console.log("not found" + this.jobSeeker)
        this.initializeControls();
      }
    }
    )
  }
  UpdateProfile() {
    // this.jobSeeker.email=this.profileForm.value['email'];
    // this.jobSeeker.firstName=this.profileForm.value['firstName'];
    //   this.jobSeeker.lastName=this.profileForm.value['lastName'];
    //   this.jobSeeker.yearOfPassing=this.profileForm.value['yearOfPassing'];
    //   this.jobSeeker.highestEducationalQualification=this.profileForm.value['highestQualification'];
    //   this.jobSeeker.workExperienceDuration=this.profileForm.value['workExperience'];
    //   this.jobSeeker.nameOfInstituition=this.profileForm.value['nameOfInstituition'];
    //   this.jobSeeker.skills=this.profileForm.value['skills'];

    this.BindFormControls();
    console.log(this.jobSeeker);
    this.submitted = true;
    console.log("validation " + this.profileForm.valid);
    if (this.profileForm.invalid) {
      return;
    }
    this.jobseeeker_service.UpdateProfile(this.jobSeeker).subscribe(
      res => {
        alert("Updated Succesfully");
        this.submitted = false;
        this.router.navigateByUrl("/user-dashboard/profile");
      }
    )
  }
  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

}
