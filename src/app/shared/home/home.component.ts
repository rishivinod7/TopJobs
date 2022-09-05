import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Email } from 'src/app/Models/email';
import { EmailService } from 'src/app/Services/email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  name:string;
  lname:string
  email:string;
  message:string;
  emailObj:Email;
  constructor(private router:Router,private emailService:EmailService) { }

  ngOnInit(): void {
  }
navigateToJobs()
{
  this.router.navigateByUrl("/jobs");
}
navigateToLogin()
{
  this.router.navigateByUrl("/login");
}
sendEmail(){
  this.emailObj.body = this.message;
  this.emailObj.toEmail = "test.topjobs9022@gmail.com";
  this.emailObj.subject = "Query from: "+this.name;
  this.emailService.SendEmail(this.emailObj).subscribe(res=>alert("Query submitted, you will receive a response shortly."));

  this.emailObj.toEmail = this.email;
  this.emailObj.subject = "Query received successfully";
  this.emailObj.body = "Thank you for the feedback, we will get back to you soon!";
  this.emailService.SendEmail(this.emailObj).subscribe();

  this.name = "";
  this.email = "";
  this.message = "";
  this.lname = "";

}
}
