import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../GLOBAL';
import { User } from '../models/employee';
import { Route } from '../models/Route';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  url = GLOBAL.url;
  public user = null;
  userSession: any;
  constructor(private httpClient: HttpClient) { }


  getAllActivates(): Observable<User[]>{
    let a = this.httpClient.get<User[]>(`${this.url}/employees?activo=1`);
    return a;
  }

  updateUser(user: User){
    return this.httpClient.put(`${this.url}/employees/${user.id}`, user);
  }

  getAllDeactivates(){
    let a = this.httpClient.get<User[]>(`${this.url}/employees?activo=0`);
    return a;
  }

  add(user: User): Observable<any>{
    return this.httpClient.post(`${this.url}/employees`, user);
  }

  getAllRoutes(){
    return this.httpClient.get<Route[]>(`${this.url}/route`);
  }


}
