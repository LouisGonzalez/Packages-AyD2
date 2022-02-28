import { Injectable } from '@angular/core';
import { Route } from '../../models/Route';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  createRoute(routeData: any){
    return this.http.post<any>(global.GLOBAL.url + "/route", routeData);
  }

  public getRoutes(pattern: string):Observable<Route[]>{
    return this.http.get<Route[]>(global.GLOBAL.querysUrl + "route?name="+pattern);
  }

}


