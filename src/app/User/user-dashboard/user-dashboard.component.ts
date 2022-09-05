import { Component, OnInit } from '@angular/core';
import { JobseekerService } from 'src/app/Services/jobseeker.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  uId:number;

  constructor(private jobSeeker_service: JobseekerService,private router:Router,private activateRoute:ActivatedRoute) 
  {
    this.activateRoute.params.subscribe(param=>this.uId=param["un"]);
   }
  sideOpenFlag = false;
  ngOnInit(): void {
    console.log(localStorage['token']);
    this.reLoad();
    if(localStorage["userId"]!=null || localStorage["userId"]!="undefined")
    {
    this.jobSeeker_service.FindProfile(localStorage["userId"]).subscribe(res => {
      console.log(res);
      if (res != null) {
        if (res.jobSeekerId != null || res.jobSeekerId != undefined) {
          localStorage["jobSeekerId"] = res.jobSeekerId;
          localStorage["jobseekerName"]=res.firstName+" "+res.lastName;
          localStorage["jobseekerProfile"] = "Created";
        }
      }
      else {
        console.log("blank");
        localStorage["jobseekerProfile"] = "notCreated";
      }
    })
  }
  }
  sideOpen() {
    this.sideOpenFlag = !this.sideOpenFlag;

  }
  reLoad(){
    this.router.navigate([this.router.url]);
    console.log(this.router.url);
  }
}
