import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from 'src/app/Services/employer.service';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {
  uId:number;


  constructor(private employerService: EmployerService,private router:Router,private activateRoute:ActivatedRoute) { 
    this.activateRoute.params.subscribe(param=>this.uId=param["un"]);
  }
sideOpenFlag=false;
  ngOnInit(): void {
    this.reLoad();
    if(localStorage["userId"]!=null || localStorage["userId"]!="undefined")
    {
    this.employerService.GetEmployerInfoByUserId(localStorage["userId"]).subscribe(res => {
      console.log(res);
      if (res != null) {
        if (res.employerId != null || res.employerId != undefined) {
          localStorage["employerId"] = res.employerId;
          localStorage["employerProfile"] = "Created";
        }
      }
      else {
        console.log("blank");
        localStorage["employerProfile"] = "notCreated";
      }
    })
  }
  }
  sideOpen()
  {
    this.sideOpenFlag=!this.sideOpenFlag;
  }
  reLoad(){
    this.router.navigate([this.router.url]);
    console.log(this.router.url);
  }
}
