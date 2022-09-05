import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employer } from 'src/app/Models/employer';
import { EmployerService } from 'src/app/Services/employer.service';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {

  constructor(private empService:EmployerService,private formBuilder:FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.reLoad();
    this.FindProfile();
  }
  employer:Employer = new Employer();

  Details() {
    console.log("details" + localStorage["employerProfile"]);
    if (localStorage["employerProfile"] == "notCreated") {
      this.router.navigateByUrl("/employer-dashboard/add-employer-profile");
    }
    else if (localStorage["employerProfile"] == "Created") {
      this.router.navigateByUrl("/employer-dashboard/update-employer-profile");
    }
  }
  reLoad(){
    this.router.navigate([this.router.url]);
    console.log(this.router.url);
  }

  FindProfile()
  {
    let userId:number=localStorage["userId"];
    console.log(userId);
    this.employer.organizationName = " ";
    this.employer.address = " ";
    this.employer.description = " ";
    this.employer.industry = " ";
 

    this.empService.GetEmployerInfoByUserId(userId).subscribe(res=>
      {
        console.log("res" + res);
        if (res != null || res != undefined) {
          this.employer = res;
          console.log(localStorage["employerProfile"]);
        }
        else {
          console.log("null res");
        }
      }
      )
  }
 
}
