import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployerAuthService } from '../Service/employer-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployerGuard implements CanActivate {
  constructor(private router:Router,private employer_auth:EmployerAuthService){}
  
  canActivate()
  {
    if(this.employer_auth.isEmployerrLoggedIn())
    {
      return true;
    }
    else
    {
      this.router.navigateByUrl("/login");
      return false;
      
    }
  }
  }
  

