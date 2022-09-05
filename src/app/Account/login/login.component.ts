import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { Login } from 'src/app/Models/login';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { JobseekerService } from 'src/app/Services/jobseeker.service';
import { Jobseeker } from 'src/app/Models/jobseeker';
import { Employer } from 'src/app/Models/employer';
import { EmployerService } from 'src/app/Services/employer.service';
import { Membership } from 'src/app/Models/membership';
import { MembershipService } from 'src/app/Services/membership.service';
import { PasswordUpdation } from 'src/app/Models/password-updation';
import { EmailService } from 'src/app/Services/email.service';
import { Email } from 'src/app/Models/email';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User = new User();
  login: Login = new Login();
  jobseeker: Jobseeker = new Jobseeker();
  employer: Employer = new Employer();
  membership: Membership = new Membership();
  pwdData: PasswordUpdation = new PasswordUpdation();
  submitted = false;
  emailObj:Email;
  constructor(private emailService:EmailService,private account_service: AccountService, private membership_service: MembershipService, private formBuilder: FormBuilder, private router: Router, private jobSeeker_service: JobseekerService, private employerService: EmployerService) {
    this.emailObj = new Email();
   }

  ngOnInit(): void {

    const reload = localStorage.getItem("reloadKey");
    if (!reload) {
      console.log(localStorage.getItem("reloadKey"));
      localStorage.setItem("reloadKey", "reloaded");
      location.reload();
    }
    else {
      console.log(localStorage.getItem("reloadKey"));
      localStorage.removeItem("reloadKey");
    }
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.email,Validators.required]],
        password: ['', Validators.required]
      }
    )
    localStorage.clear;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  sendPassword(){
    console.log("here");
    this.emailObj.toEmail = this.pwdData.email;
    this.account_service.GetPassword(this.emailObj.toEmail).subscribe(res=>{
      console.log(res);
      if (res!=null){
        this.emailObj.subject = "Password retrieval";
        this.emailObj.body = "Your existing password is: "+res.password;
        this.emailService.SendEmail(this.emailObj).subscribe(res1=>alert("Password sent to your registered email address"));
      }
      else alert("An account with this email address does not exist. Try again.");
    })

  }

  Login() {
    this.login.email = this.loginForm.value['email'];
    this.login.password = this.loginForm.value['password'];
    this.submitted = true;
    console.log(this.loginForm.valid);
    if (this.loginForm.invalid) {
      return;
    }
    this.account_service.Validate(this.login).subscribe(res => {
      this.user = res;

      console.log(this.user);
      if (this.user == null) {
        alert("Credentials could not be validated");
      }
      else if(this.user.isEmailConfirmed==false)
      {
        alert("Email has not been confirmed yet");
        this.router.navigateByUrl('/confirmEmail');
        localStorage["emailToBeConfirmed"]=this.user.email;
      }
      else {
        localStorage["userId"] = this.user.userId;
        localStorage["emailId"] = this.user.email;
        localStorage['token'] = this.user.token;
        localStorage["role"] = this.user.role;
        this.jobSeeker_service.FindProfile(this.user.userId).subscribe(res => {
          this.jobseeker = res;
          console.log(this.jobseeker + "status")
          // console.log("1"+this.jobseeker+" "+this.jobseeker.jobSeekerId);
        });
        this.employerService.GetEmployerInfoByUserId(this.user.userId).subscribe(res => {
          this.employer = res;
          console.log(this.employer + "status")
          // console.log("1"+this.jobseeker+" "+this.jobseeker.jobSeekerId);
        });
        if (this.user != null && this.user.role == "Job-Seeker") {
          if (this.jobseeker == null || this.jobseeker == undefined) {
            console.log(this.jobseeker + " " + this.jobseeker.jobSeekerId);
            localStorage["jobseekerName"]=this.jobseeker.firstName+" "+this.jobseeker.lastName;
            this.router.navigateByUrl("/user-dashboard/add-profile");
          }

          else if (this.jobseeker != null) {
            this.router.navigateByUrl("/user-dashboard/jobs");
          }

        }
        else if (this.user != null && this.user.role == "Admin") {

          this.router.navigateByUrl("/admin-dashboard/manage-employers")
        }
        else if (this.user != null && this.user.role == "Employer") {
          this.router.navigateByUrl("/employer-dashboard/trackjobs");
          if (this.employer == null || this.employer == undefined) {
            console.log(this.employer + " " + this.employer.employerId);
            this.router.navigateByUrl("/employer-dashboard/add-employer-profile");
          }

          else if (this.employer != null) {
            this.router.navigateByUrl("/employer-dashboard/trackjobs");
          }
        }
      }


    });

  }
  //password reset
  ResetPassword() {
    this.account_service.ChangePassword(this.pwdData).subscribe(res => {
      console.log(res);
      if (res == true) {
        alert("Password Updated succesfully!");

      }
      else {
        alert("Please enter correct details");
      }
    })
  }


}
