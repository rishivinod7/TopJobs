import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MembershipAuthService } from '../Service/membership-auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipGuard implements CanActivate {
  constructor(private membership_auth:MembershipAuthService,private router:Router){}
  canActivate()
    {
    if(this.membership_auth.isMemberShipActive())
    {
      return true;
    }
    else
    {
      alert("You dont have a membership");
      this.router.navigateByUrl("/employer-dashboard/membership");
      return false;
      
    }
  }
  
}
