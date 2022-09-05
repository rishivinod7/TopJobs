import { Component, OnInit } from '@angular/core';
import {EmployerService} from 'src/app/Services/employer.service';
import { Router } from '@angular/router';
import { Employer } from 'src/app/Models/employer';

@Component({
  selector: 'app-manage-employers',
  templateUrl: './manage-employers.component.html',
  styleUrls: ['./manage-employers.component.css']
})
export class ManageEmployersComponent implements OnInit {

  constructor(private employer_service: EmployerService, private router: Router) { }
  employers: Employer[];
  page:number=1;
  size:number;

  ngOnInit(): void {
    this.ViewAllEmployers();
  }
  ViewAllEmployers() {
    
    this.employer_service.ViewAllEmployers().subscribe(res => {
      this.employers = res;
      this.size=this.employers.length;

        })

  }
  handlePageChange(event)
  {
    this.page=event;
  } 
  ViewJobsByEmployerId(employerId : number, companyName: string){
 localStorage["employerId"]=employerId;
 localStorage["companyName"]=companyName;
 console.log(localStorage["employerId"])
 this.router.navigateByUrl("/admin-dashboard/view-jobs")
  }


}
