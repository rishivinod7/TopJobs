import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEmail } from 'src/app/Models/confirm-email';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
confirmObj:ConfirmEmail=new ConfirmEmail();
  constructor(private account_service:AccountService,private router:Router) { }

  ngOnInit(): void {
  }
confirm()
{
  this.confirmObj.email=localStorage["emailToBeConfirmed"];
  this.account_service.ConfirmEmail(this.confirmObj).subscribe(res=>{
    console.log("email confirmation"+res);
    if(res==true)
    {
      alert("Email verification successful!");
      this.router.navigateByUrl("/login");
    }
    else
    {
      alert("Verification failed!");
    }
  })
}
}
