import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jobseeker } from '../Models/jobseeker';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {

  jobseeker_api: string = environment.jobseeker_api;
  constructor(private http: HttpClient) { }
  AddProfile(profile: Jobseeker): Observable<any> {
    return this.http.post(this.jobseeker_api + "AddProfile", profile);
  }
  UpdateProfile(profile: Jobseeker): Observable<any> {
    return this.http.put<any>(this.jobseeker_api + "UpdateProfile", profile);
  }
  GetProfile(jobSeekerId: number): Observable<any> {
    return this.http.get<any>(this.jobseeker_api + "ViewProfile/" + jobSeekerId);
  }
  FindProfile(userId: number): Observable<any> {
    return this.http.get<any>(this.jobseeker_api + "ViewProfileByUserId/" + userId);
  }
}
