import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor() { }
  isAdminLoggedIn()
  {
    if(localStorage["role"]=="Admin")
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
