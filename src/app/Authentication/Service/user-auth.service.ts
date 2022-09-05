import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  isUserLoggedIn()
  {
    if(localStorage["role"]=="Job-Seeker")
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
