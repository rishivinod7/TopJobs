import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employer } from '../Models/employer';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  employer_api: string = environment.employer_api;
  constructor(private http: HttpClient) { }
  GetEmployerInfo(employerId:number): Observable<Employer> 
  {
    return this.http.get<Employer>(this.employer_api + "ViewProfile/"+employerId);
  }
  GetEmployerInfoByUserId(userId:number): Observable<Employer> 
  {
    return this.http.get<Employer>(this.employer_api + "ViewProfileByUserId/"+userId);
  }
  AddProfile(profile: Employer): Observable<any> 
  {
    return this.http.post(this.employer_api + "AddProfile", profile);
  }
  UpdateProfile(profile: Employer): Observable<any> 
  {
    return this.http.put<any>(this.employer_api + "UpdateProfile", profile);
  }
  ViewAllEmployers(): Observable<any> 
  {
    return this.http.get<any>(this.employer_api + "ViewAllEmployers");
  }
}
