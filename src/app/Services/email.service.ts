import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from '../Models/email';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  email_api: string = environment.email_api;
  constructor(private http: HttpClient) { }
  SendEmail(email: Email): Observable<any> {
    return this.http.post(this.email_api + "Send", email);
  }
}
