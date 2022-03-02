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

  getAllRoutes() {
    return this.http.get<any>(global.GLOBAL.url + "/route/");
  }

  getRoute(id : number) {
    return this.http.get<Route>(global.GLOBAL.url + "/route/" + id);
  }

  putRoute(data : any, id : number) {
    return this.http.put<any>(global.GLOBAL.url + "/route/" + id, data);
  }

  getAllRoutesStatus(status : boolean) {
    console.log(status);
    return this.http.get<any>(global.GLOBAL.url + `/route?active=${status}`);
  }

}


