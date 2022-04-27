import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { Destination } from '../../models/destination';
import { Observable } from 'rxjs';
import { DestinationListTemplate } from '../../models/DestinationListTemplate';
import { CustomServerDataSource } from '../../models/CustomServerDataSource';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  public createDestination(data: any) {
    return this.http.post<any>(global.GLOBAL.urlMicroserviceAdministration + "/destination/", data);
  }

  /**
   * Funcion que ejecuta una peticion http GET para obtener todos los destinos
   * que coincidan con el patron de busqueda que se recibe como parametro.
   * @param pattern Patron de a buscar
   * @returns Listado de destinos que coinciden con el patron de busquda
   */
  public getDestinations(pattern: string):Observable<Destination[]>{
    return this.http.get<Destination[]>(global.GLOBAL.urlMicroserviceAdministration + "/destination/search-by-name/"+pattern);
  }

  /**
   * Funcion que ejecuta una peticion http GET para obtener todos los destinos.
   * @returns Listado de destinos
   */
  public getAllDestinations():Observable<Destination[]>{
    return this.http.get<Destination[]>(global.GLOBAL.url + '/destination');
  }

  public getDestination(id: number):Observable<any>{
    return this.http.get<any>(global.GLOBAL.urlMicroserviceAdministration + '/destination/' + id);
  }

  public updateDestination(destination: any) {
    return this.http.patch<any>(`${global.GLOBAL.urlMicroserviceAdministration}/destination`, destination);
  }

  public getDestinationById(id : number) {
    return this.http.get<Destination>(global.GLOBAL.url + "/destination/" + id);
  }

  /**
   * datakey: Nombre del array que contiene los datos del servidor
   * endPoint: URI 
   * pagerPageKey: Nombre del parametro que representa el numero de pagina en el servidor.
   * pagerLimitKey: Nombre del parametro que representa la cantidad de elementos por pagina en el servidor.
   * totalKey: Nombre del atributo que contiene el numero total de elementos.
   */
  public getAllDestinationsPaginated() {
    return new CustomServerDataSource(this.http, {
      dataKey: 'content',
      endPoint: global.GLOBAL.urlMicroserviceAdministration + '/destination/list',
      pagerPageKey: 'page', 
      pagerLimitKey: 'size', 
      totalKey: 'totalElements' 
    });
  }

  public deleteDestination(id : number) {
    return this.http.delete<any>(`${global.GLOBAL.urlMicroserviceAdministration}/destination/` + id);
  }
}
