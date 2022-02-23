import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../../GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  createDestination(data: any) {
    return this.http.post<any>(global.GLOBAL.url + "destination/", data);
  }
}
