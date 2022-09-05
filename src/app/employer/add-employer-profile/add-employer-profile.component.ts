import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employer } from 'src/app/Models/employer';
import { EmployerService } from 'src/app/Services/employer.service';
@Component({
  selector: 'app-add-employer-profile',
  templateUrl: './add-employer-profile.component.html',
  styleUrls: ['./add-employer-profile.component.css']
})
export class AddEmployerProfileComponent implements OnInit {
  profileForm:FormGroup;
  employer:Employer;
  submitted=false;
  constructor(private empService:EmployerService,private formBuilder:FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.employer=new Employer();
    this.profileForm=this.formBuilder.group(
      {
        organization:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        address:['',Validators.required],
        industry:['',Validators.required],
        description:['',Validators.required]
      }
    )
   
  }
  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  BindFormControls()
  {
    this.employer.organizationName=this.profileForm.value['organization'];
    this.employer.address=this.profileForm.value['address'];
    this.employer.industry=this.profileForm.value['industry'];
    this.employer.description=this.profileForm.value['description'];

  }
  AddProfile()
  {

    this.BindFormControls();
    this.employer.userId=localStorage["userId"];
    console.log(this.employer.address);
    this.submitted=true;
    if(this.profileForm.invalid)
    {
      return;
    }

    this.empService.AddProfile(this.employer).subscribe(res=>
      {
        localStorage["employerProfile"] == "Created"
        alert("Succesfully saved!");
        this.router.navigateByUrl("/employer-dashboard/trackjobs");
      })

  }
  

}
