import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployerAuthService {

  constructor() { }
  isEmployerrLoggedIn()
  {
    if(localStorage["role"]=="Employer")
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
