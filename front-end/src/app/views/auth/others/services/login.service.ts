import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../GLOBAL';
import { User } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url: string;
  public user = null;
  userSession: any;
  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url
  }

  setUserSesion(val: boolean){
    this.userSession = val;
  }

  getIdentity(){
    let user = JSON.parse(localStorage.getItem('user')!);
    if(user != undefined){
      this.user = user;
    } else {
      this.user = null;
    }
    return this.user;
  }

  login(username: string, password: string): Observable<User[]> {
    let a = this.httpClient.get<User[]>(`${this.url}/employees?username=${username}&password=pass123`);
    return a;
  }
}
