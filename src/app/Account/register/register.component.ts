import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EmailService } from 'src/app/Services/email.service';
import { Email } from 'src/app/Models/email';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: User = new User();
  email:Email=new Email();
  submitted=false;
  constructor(private account_service: AccountService, private formBuilder: FormBuilder, private router: Router,private email_service:EmailService) { }

  ngOnInit(): void {
   
    this.registrationForm = this.formBuilder.group(
      {
        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required,Validators.minLength(8)]],
        role: ['', Validators.required]
      }
    )
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }
  Register() {
    this.user.email = this.registrationForm.value['email'];
    this.user.password = this.registrationForm.value['password'];
    this.user.role = this.registrationForm.value['role'];
    this.user.isEmailConfirmed=false;
    this.user.unique=(Math.floor((Math.random() * 90000) + 10000).toString());
    console.log(this.user);
    this.submitted=true;
    if(this.registrationForm.invalid)
    {
      return;
    }
    this.account_service.Register(this.user).subscribe(res => {
      console.log(res);
      this.email.toEmail=this.user.email;
      this.email.subject="Welcome to Top Jobs!!";
      if(this.user.role=="Job-Seeker")
      {
      this.email.body="Hi "+"We hope you find your dream job sooner! Please find your unique code below to activate your account "+this.user.unique;
      }
      if(this.user.role=="Employer")
      {
      this.email.body="Hi "+"We hope you find our services helpful and find your talent! Please find your unique code below to activate your account "+this.user.unique;
      }
      this.email_service.SendEmail(this.email).subscribe(res=>
        {
          console.log("email sent");
        })
      alert("Registration successful!");
      this.router.navigateByUrl("/login");
    })
  }

}
