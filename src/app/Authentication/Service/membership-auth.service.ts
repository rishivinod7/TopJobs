import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembershipAuthService {

  constructor() { }
  isMemberShipActive()
  {
    if(localStorage["role"]=="Employer" && localStorage["memberShipStatus"]=="active")
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
