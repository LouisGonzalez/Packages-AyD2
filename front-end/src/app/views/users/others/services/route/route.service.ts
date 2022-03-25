import { Injectable } from '@angular/core';
import { Route } from '../../models/Route';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { Observable } from 'rxjs';
import { CustomServerDataSource } from '../../models/CustomServerDataSource';


@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  createRoute(routeData: any){
    return this.http.post<any>(global.GLOBAL.urlApi + "/route", routeData);
  }

  public getRoutes(pattern: string):Observable<Route[]>{
    return this.http.get<Route[]>(global.GLOBAL.urlApi + "/route/search-by-name/"+pattern);
  }

  getAllRoutes() {
    return this.http.get<any>(global.GLOBAL.url + "/route/");
  }

    /**
   * datakey: Nombre del array que contiene los datos del servidor
   * endPoint: URI 
   * pagerPageKey: Nombre del parametro que representa el numero de pagina en el servidor.
   * pagerLimitKey: Nombre del parametro que representa la cantidad de elementos por pagina en el servidor.
   * totalKey: Nombre del atributo que contiene el numero total de elementos.
   */
  public getAllRoutesPaginated() {
    return new CustomServerDataSource(this.http, {
      dataKey: 'content',
      endPoint: global.GLOBAL.urlApi + '/route/list',
      pagerPageKey: 'page', 
      pagerLimitKey: 'size', 
      totalKey: 'totalElements' 
    });
  }

  public getRoute(id : number) {
    return this.http.get<any>(global.GLOBAL.urlApi + "/route/" + id);
  }

  public patchRoute(data : any) {
    return this.http.patch<any>(global.GLOBAL.urlApi + "/route", data);
  }

  public deleteRoute(id : number) {
    return this.http.delete<any>(`${global.GLOBAL.urlApi}/route/` + id);
  }
  
  getAllRoutesStatus(status : boolean) {
    console.log(status);
    return this.http.get<any>(global.GLOBAL.url + `/route?active=${status}`);
  }

  public getMostPopularRoute() {
    return this.http.get<any>(global.GLOBAL.urlApi + "/route/most-popular-route")
  }

}


