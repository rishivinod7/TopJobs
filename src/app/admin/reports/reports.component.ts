import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import * as Chart from 'chart.js';
import { EmployerService } from 'src/app/Services/employer.service';
import { JobsService } from 'src/app/Services/jobs.service';
import { ApplicationService } from 'src/app/Services/application.service';
import { Application } from 'src/app/Models/application';
import { Job } from 'src/app/job';
import { Employer } from 'src/app/Models/employer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private employer_service:EmployerService,private router:Router,private job_service:JobsService,private application_service:ApplicationService) { }
applications:Application[]=[];
jobs:Job[]=[];
employers:Employer[]=[];
selected:number=0;
  ngOnInit(): void {
    this.loadData();
  }
  loadData()
  {
    this.employer_service.ViewAllEmployers().subscribe(res=>
      {
        this.employers=res;
        localStorage["employerCount"]=this.employers.length;
        
      });
      this.job_service.ViewJobs().subscribe(res1=>
        {
          this.jobs=res1;
          localStorage["jobCount"]=this.jobs.length;
        })
        this.application_service.GetAllApplications().subscribe(res2=>
          {
            this.applications=res2;
            localStorage["appCount"]=this.applications.length;
            this.applications.forEach(element => {
              if(element.applicationStatus=="Approved")
              {
                this.selected+=1;
              }
              
            });
            console.log(this.selected);
            localStorage["selected"]=this.selected;
          })
          console.log(this.applications.length+""+this.jobs.length+""+this.employers.length)
          
          
  }
  ChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Chart.Color[] = ['Total Job Posts'];
  ChartLegend = true;
  ChartPlugins = [];
  pieChartData: ChartDataset[] = [
    { data: [localStorage["jobCount"]], label: 'Job Posts',backgroundColor:"orange" }
  ];
  barChartLabels: Chart.Color[] = ['Total Applications','Selected'];
  barChartData: ChartDataset[] = [
    { data:[localStorage["appCount"],localStorage["selected"]], label: 'Applications',backgroundColor:["blue","green"]}
  ];

  
}
