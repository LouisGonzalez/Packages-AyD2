import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import * as global from '../../../../GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class AuthPasswordService {

  constructor(private http: HttpClient) { }

  sendEmail(data : any) {
    return this.http.post<any>(global.GLOBAL.urlMicroserviceAuthentication +"/email/send-email-forgot-password/", data);
  }

  searchUserByEmail(email : any) {
    return this.http.get<any>(global.GLOBAL.urlMicroserviceAuthentication +"/employee/search-by-email/" + email);
  }

  changePassword(data : any) {
    return this.http.post<any>(`${global.GLOBAL.urlMicroserviceAuthentication}/employee/change-password/`, data);
  }
}
