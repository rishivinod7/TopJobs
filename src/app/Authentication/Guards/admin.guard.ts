import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../Service/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private admin_auth:AdminAuthService,private router:Router){}
  canActivate()
  {
    if(this.admin_auth.isAdminLoggedIn())
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
