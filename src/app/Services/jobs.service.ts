import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../job';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  jobs_api: string = environment.jobs_api;
  constructor(private http: HttpClient) { }
  ViewJobs(): Observable<Job[]> 
  {
    return this.http.get<Job[]>(this.jobs_api + "ViewJobs");
  }
  ViewJobsByEmployerId(employerId:number): Observable<Job[]> 
  {
    return this.http.get<Job[]>(this.jobs_api + "ViewJobs/"+employerId);
  }
  ViewJob(jobId:number): Observable<Job> 
  {
    return this.http.get<Job>(this.jobs_api + "ViewJob/"+jobId);
  }
  PostJob(job: Job): Observable<any> {
    return this.http.post(this.jobs_api + "PostJob", job);
  }
  UpdateJob(job: Job): Observable<any> {
    return this.http.put(this.jobs_api + "EditJob", job);
  }
  DeleteJob(jobId: number): Observable<Job> 
  {
    return this.http.delete<Job>(this.jobs_api + "DeleteJob/"+ jobId);
  }
}
