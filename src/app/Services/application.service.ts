import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../Models/application';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  application_api= environment.application_api;
  constructor(private http: HttpClient) { }
  ApplyJob(application: Application): Observable<any> {
    return this.http.post(this.application_api + "PostApplication", application);
  }
  CheckDuplicateApplication(jobId:number):Observable<Application[]>
  {
    return this.http.get<Application[]>(this.application_api+"ViewApplicationsByJobId/"+jobId);
  }
  GetAllUserApplications(jobSeekerId:number):Observable<Application[]>
  {
    return this.http.get<Application[]>(this.application_api+"ViewApplicationsByJobseeker/"+jobSeekerId);
  }
  GetAllApplications():Observable<Application[]>
  {
    return this.http.get<Application[]>(this.application_api+"ViewAllApplications");
  }
  GetApplication(applictionId:number):Observable<Application>
  {
    return this.http.get<Application>(this.application_api+"ViewApplication/"+applictionId);
  }
  UpdateApplication(application: Application): Observable<any> {
    return this.http.put(this.application_api + "UpdateApplication", application);
  }
  DeleteApplicationsByJobId(jobId:number):Observable<any>{
    return this.http.delete(this.application_api+"DeleteApplicationsByJobId/"+jobId);
  }

}
