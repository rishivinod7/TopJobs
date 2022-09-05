import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
viewJobsLink:string;
  constructor(private router:Router) { }
 loginFlag:string;
 signoutFlag:string;
  ngOnInit(): void {
    this.viewJobs();
  }
  viewJobs()
  {
    console.log("jobs"+localStorage["userId"]);
    if(localStorage["userId"]==null || localStorage["userId"]=="undefined")
    {
      this.viewJobsLink="/jobs";
      this.loginFlag="visible;";
      this.signoutFlag = "hidden";
    }
    else
    {
      this.viewJobsLink="/user-dashboard/jobs";
      this.loginFlag="hidden";
      this.signoutFlag = "visible";
    }
  }
  logOut()
  {
    console.log("userId"+localStorage["userId"]);
    localStorage.clear();
    // localStorage["userId"]="";
    console.log("userId"+localStorage["userId"]);
    this.router.navigateByUrl("/login");
  }

}
