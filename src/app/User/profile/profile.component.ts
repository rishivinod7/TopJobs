import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/job';
import { Jobseeker } from 'src/app/Models/jobseeker';
import { JobseekerService } from 'src/app/Services/jobseeker.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private jobseeker_service: JobseekerService, private router: Router) { }

  ngOnInit(): void {
    this.FindProfile();
  }
  jobSeeker: Jobseeker = new Jobseeker();
  FindProfile() {
    let userId: number = localStorage["userId"];
    console.log(userId);
    this.jobSeeker.firstName = " ";
    this.jobSeeker.lastName = " ";
    this.jobseeker_service.FindProfile(userId).subscribe(res => {
      console.log("res" + res);
      if (res != null || res != undefined) {
        this.jobSeeker = res;
        localStorage["jobseekerName"] = this.jobSeeker.firstName;

      }
      else {
        console.log("null res");
        localStorage["jobseekerName"] = "Jobseeker";

      }
    })
  }

  Details() {
    console.log("details" + localStorage["jobseekerProfile"]);
    if (localStorage["jobseekerProfile"] == "notCreated") {
      this.router.navigateByUrl("/user-dashboard/add-profile");
    }
    else {
      this.router.navigateByUrl("/user-dashboard/update-profile");
    }
  }
}
