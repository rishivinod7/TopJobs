import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-side-navbar',
  templateUrl: './employer-side-navbar.component.html',
  styleUrls: ['./employer-side-navbar.component.css']
})
export class EmployerSideNavbarComponent implements OnInit {

  constructor(private router:Router) { }
userEmail:string;
  ngOnInit(): void {
    this.userEmail=localStorage["emailId"];
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
