import { Injectable } from '@angular/core';
import { Membership } from '../Models/membership';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  membership_api= environment.membership_api;
  constructor(private http: HttpClient) { }
  AddMembership(membership: Membership): Observable<any> {
    return this.http.post(this.membership_api + "AddMembership", membership);
  }
  GetMembershipStatus(employerId:number):Observable<any>
  {
    return this.http.get<any>(this.membership_api+"GetMembershipStatus/"+employerId);
  }
  ViewMemberShipsByEmployer(employerId):Observable<any[]>
  {
    return this.http.get<any[]>(this.membership_api+"ViewMembershipsPerEmployer/"+employerId);
  }
}
