import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { Destination } from '../../models/destination';
import { Observable } from 'rxjs';
import { DestinationListTemplate } from '../../models/DestinationListTemplate';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  public createDestination(data: any) {
    return this.http.post<any>(global.GLOBAL.urlApi + "/destination/", data);
  }

  /**
   * Funcion que ejecuta una peticion http GET para obtener todos los destinos
   * que coincidan con el patron de busqueda que se recibe como parametro.
   * @param pattern Patron de a buscar
   * @returns Listado de destinos que coinciden con el patron de busquda
   */
  public getDestinations(pattern: string):Observable<Destination[]>{
    return this.http.get<Destination[]>(global.GLOBAL.url + "destinations/search-by-name/"+pattern);
  }

  /**
   * Funcion que ejecuta una peticion http GET para obtener todos los destinos.
   * @returns Listado de destinos
   */
  public getAllDestinations():Observable<Destination[]>{
    return this.http.get<Destination[]>(global.GLOBAL.url + '/destination');
  }

  public getDestination(id: number):Observable<DestinationListTemplate[]>{
    return this.http.get<DestinationListTemplate[]>(global.GLOBAL.url + '/destination?id=' + id);
  }

  setDestination(data : DestinationListTemplate, id : number) {
    return this.http.put<DestinationListTemplate>(`${global.GLOBAL.url}/destination/` + id, data);
  }

  public getDestinationById(id : number) {
    return this.http.get<Destination>(global.GLOBAL.url + "/destination/" + id);
  }
}
