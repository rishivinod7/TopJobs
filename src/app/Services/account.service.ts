import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { Login } from '../Models/login';
import { Observable } from 'rxjs';
import { PasswordUpdation } from '../Models/password-updation';
import { environment } from 'src/environments/environment';
import { ConfirmEmail } from '../Models/confirm-email';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account_api = environment.account_api;
  constructor(private http: HttpClient) { }
  Register(user: User): Observable<any> {
    return this.http.post(this.account_api + "Register", user);
  }
  Validate(login: Login): Observable<any> {
    return this.http.post<any>(this.account_api + "Login", login);
  }
  //forgot password
  ChangePassword(data:PasswordUpdation)
  {
    return this.http.post<any>(this.account_api+"ChangePassword",data);
  }
  GetPassword(email:string)
  {
    return this.http.get<any>(this.account_api+"FetchPassword/"+email);
  }
  ConfirmEmail(obj:ConfirmEmail)
  {
    return this.http.put(this.account_api+"ConfirmEmail",obj);
  }



}
