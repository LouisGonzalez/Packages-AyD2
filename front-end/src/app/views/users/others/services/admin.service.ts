import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../GLOBAL';
import { User } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  url = GLOBAL.url;
  public user = null;
  userSession: any;
  constructor(private httpClient: HttpClient) { }

  add(user: User): Observable<any>{
    return this.httpClient.post(`${this.url}/employees`, user);
  }

}
