import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-side-navbar',
  templateUrl: './admin-side-navbar.component.html',
  styleUrls: ['./admin-side-navbar.component.css']
})
export class AdminSideNavbarComponent implements OnInit {

  constructor(private router: Router) { }
  userEmail:string;

  ngOnInit(): void {
    this.userEmail=localStorage["emailId"]
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
