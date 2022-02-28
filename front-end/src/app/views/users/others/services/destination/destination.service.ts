import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { Destination } from '../../models/destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  createDestination(data: Destination) {
    return this.http.post<Destination>(global.GLOBAL.url + "/destination/", data);
  }
}
