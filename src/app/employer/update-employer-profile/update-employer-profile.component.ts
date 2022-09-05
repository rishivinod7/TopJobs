import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employer } from 'src/app/Models/employer';
import { EmployerService } from 'src/app/Services/employer.service';

@Component({
  selector: 'app-update-employer-profile',
  templateUrl: './update-employer-profile.component.html',
  styleUrls: ['./update-employer-profile.component.css']
})
export class UpdateEmployerProfileComponent implements OnInit {

  profileForm:FormGroup;
  employer:Employer;
  saveBtn:string;
  updateBtn:string;
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
   this.FindProfile();
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
  
  FindProfile()
  {
    let userId:number=localStorage["userId"];
    console.log(userId);
    this.empService.GetEmployerInfoByUserId(userId).subscribe(res=>
      {
        this.employer=res;
        if(this.employer!=null)
        {
          this.profileForm.patchValue(
            {'organization':this.employer.organizationName,
            'address':this.employer.address,
            'industry':this.employer.industry,
            'description':this.employer.description
                    
           }
          );
          localStorage["employerId"]=this.employer.employerId;
          console.log(this.employer.employerId);
          this.saveBtn="hidden";
          this.updateBtn="visible";
          console.log(this.employer);
        }
        else
        {
           console.log("acc not found");
         }
      }
      )
  }
  UpdateProfile()
  {
 
  this.BindFormControls();
    console.log(this.employer);
    this.submitted=true;
    if(this.profileForm.invalid)
    {
      return;
    }

    this.empService.UpdateProfile(this.employer).subscribe(
      res=>{
        alert("Updated Succesfully");
        this.router.navigateByUrl("/employer-dashboard/employer-profile");

      }
    )
  }
}
