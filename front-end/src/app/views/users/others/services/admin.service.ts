import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../GLOBAL';
import { CustomServerDataSource } from '../models/CustomServerDataSource';
import { User } from '../models/employee';
import { Route } from '../models/Route';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  url = GLOBAL.url;
  urlApi = GLOBAL.urlApi;
  urlAdmin = GLOBAL.urlMicroserviceAdministration
  public user = null;
  userSession: any;
constructor(private httpClient: HttpClient) { }

  getAll() {
    return new CustomServerDataSource(this.httpClient, {
      dataKey: 'content',
      endPoint: `${this.urlAdmin}/employee/`,
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      totalKey: 'totalElements'
    })
  }

  getAllActivates(): Observable<any>{
    let a = this.httpClient.get(`${this.urlAdmin}/employee/actives/`);
    return a;
  }

  getAllActivatesNotAdmin(): Observable<any>{
    let a = this.httpClient.get(`${this.urlAdmin}/employee/actives/not-admin/`)
    return a;
  }

  //Falta arreglar
  getAllDeactivates(): Observable<any>{
    let a = this.httpClient.get(`${this.urlAdmin}/employee/deactivates/`);
    return a;
  }

  updateUser(user: User){
    return this.httpClient.put(`${this.urlAdmin}/employee/${user.cui}`, user);
  }


  add(user: User): Observable<any>{
    return this.httpClient.post(`${this.urlAdmin}/employee/`, user);
  }

  getAllRoutes(){
    return this.httpClient.get<Route[]>(`${this.url}/route`);
  }


}
