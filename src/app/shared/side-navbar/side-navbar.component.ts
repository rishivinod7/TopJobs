import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  constructor(private router: Router) { }
  userEmail: string;
  profileLink: string;

  ngOnInit(): void {
    this.userEmail = localStorage["emailId"];
  }


  logOut() {
    console.log("userId" + localStorage["userId"]);
    localStorage.clear();
    // localStorage["userId"]="";
    console.log("userId" + localStorage["userId"]);
    this.router.navigateByUrl("/login");
  }
}
