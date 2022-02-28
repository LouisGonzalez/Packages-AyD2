import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import * as global from '../../../../GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class AuthPasswordService {

  constructor(private http: HttpClient) { }

  sendEmail(data : any) {
    console.log(global.GLOBAL);
    return this.http.post<any>(global.GLOBAL.url +"/sendEmail/", data);
  }

  changePassword(data : any, id : number) {
    return this.http.put<any>(`${global.GLOBAL.url}/employees/` + id, data);
  }
}
