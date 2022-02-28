import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { Destination } from '../../models/destination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  public createDestination(data: any) {
    return this.http.post<any>(global.GLOBAL.url + "/destination/", data);
  }

  public getDestinations(pattern: string):Observable<Destination[]>{
    return this.http.get<Destination[]>(global.GLOBAL.querysUrl + "destination?name="+pattern);
  }

  public getDestination(id : number) {
    return this.http.get<Destination>(global.GLOBAL.url + "/destination/" + id);
  }
}
