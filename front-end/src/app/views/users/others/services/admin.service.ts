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
  urlApi = GLOBAL.urlApi;
  public user = null;
  userSession: any;
constructor(private httpClient: HttpClient) { }


  getAllActivates(): Observable<any>{
    let a = this.httpClient.get(`${this.urlApi}/employee/actives/`);
    return a;
  }

  //Falta arreglar
  getAllDeactivates(): Observable<any>{
    let a = this.httpClient.get(`${this.urlApi}/employee/deactivates/`);
    return a;
  }

  updateUser(user: User){
    return this.httpClient.put(`${this.urlApi}/employee/${user.cui}`, user);
  }


  add(user: User): Observable<any>{
    return this.httpClient.post(`${this.urlApi}/employee/`, user);
  }

  getAllRoutes(){
    return this.httpClient.get<Route[]>(`${this.url}/route`);
  }


}
