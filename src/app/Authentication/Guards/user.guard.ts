import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../Service/user-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private user_auth:UserAuthService,private router:Router){}
  canActivate()
    {
    if(this.user_auth.isUserLoggedIn())
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
