import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-employer-analytics',
  templateUrl: './employer-analytics.component.html',
  styleUrls: ['./employer-analytics.component.css']
})
export class EmployerAnalyticsComponent implements OnInit {

  constructor() { }
submitted:number=0;
shortlisted:number=0;
rejected:number=0;
selected:number=0;
  ngOnInit(): void {
  }
  ChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Chart.Color[] = ['Total Job Posts'];
  ChartLegend = true;
  ChartPlugins = [];
  pieChartData: ChartDataset[] = [
    { data: [localStorage["jobCount"]], label: 'Job Posts',backgroundColor:"blue" }
  ];
  barChartLabels: Chart.Color[] = ['Memberships'];
  barChartData: ChartDataset[] = [
    { data: [localStorage["memberShipCount"]], label: 'Memberships',backgroundColor:"red" }
  ];

}
