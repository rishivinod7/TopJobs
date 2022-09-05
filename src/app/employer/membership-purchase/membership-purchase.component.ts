import { Component, OnInit } from '@angular/core';
import { Employer } from 'src/app/Models/employer';
import { Membership } from 'src/app/Models/membership';
import { MembershipService } from 'src/app/Services/membership.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Payment } from 'src/app/Models/payment';
@Component({
  selector: 'app-membership-purchase',
  templateUrl: './membership-purchase.component.html',
  styleUrls: ['./membership-purchase.component.css']
})
export class MembershipPurchaseComponent implements OnInit {
  membership:Membership=new Membership();
  paymentDetails:Payment;

  constructor(private membershipService:MembershipService,private datePipe: DatePipe,private router:Router) { }

  ngOnInit(): void {
  }

  Pay(){
    this.membership.employerId = localStorage["employerId"];
    console.log(this.membership.employerId);
    this.membership.startDate =new Date();
    console.log(this.membership.startDate);
    this.membership.endDate = new Date(this.membership.startDate);
    this.membership.endDate.setDate(this.membership.endDate.getDate() + 30);
    console.log(this.membership.endDate);
    this.membershipService.AddMembership(this.membership).subscribe(res=>
      {
        alert("Membership purchased!");
        this.router.navigateByUrl("/employer-dashboard/trackjobs");
        
      });

  }

}
