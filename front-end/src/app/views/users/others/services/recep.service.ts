import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../GLOBAL';
import { Client } from '../models/Client';
import { Destination } from '../models/destination';
import { Route } from '../models/Route';
import { Invoice } from '../models/Invoice';
import { Package } from '../models/Package';
import { PackageInformation } from '../models/PackageInformation';
import { CustomServerDataSource } from '../models/CustomServerDataSource';
import { Queue } from '../models/Queue';

@Injectable({
  providedIn: 'root'
})
export class RecepService {

  url = GLOBAL.url;
  urlApi = GLOBAL.urlApi;
  public client = null;

  constructor(private httpClient: HttpClient) { }


  createQueue(queue: Queue): Observable<any> {
    let a = this.httpClient.post(`${this.urlApi}/queue/`, queue);
    return a;
  }

  //Querys relacionadas a clientes
  getAllClients(): Observable<any>{                                   //LISTO
    let a = this.httpClient.get(`${this.urlApi}/client/`);
    return a;
  }

  getClient(nit: number): Observable<any>{                            //LISTO
    let a = this.httpClient.get(`${this.urlApi}/client/${nit}`);
    return a;
  }

  addClient(client: Client): Observable<any>{                         //LISTO
    return this.httpClient.post(`${this.urlApi}/client/`, client);
  }

  //Querys relacionadas a destinos
  getAllDestinys(): Observable<any>{                                  //LISTO
    let a = this.httpClient.get(`${this.urlApi}/destination/`);
    return a;
  }

  //busca de rutas segun destino
  getRouteByDestiny(idDestiny: number): Observable<any>{              //LISTO
    let a = this.httpClient.get<any>(`${this.urlApi}/route/destination/${idDestiny}`);
    return a;
  }

  getDestinyById(idDestiny: number): Observable<any>{                 //LISTO
    let a = this.httpClient.get(`${this.urlApi}/destination/${idDestiny}`);
    return a;
  }

  createInvoice(invoice: Invoice): Observable<any>{                   //LISTO
    return this.httpClient.post(`${this.urlApi}/invoice/`, invoice);
  }

  creaatePackage(pack: Package): Observable<any>{                     //LISTO
    return this.httpClient.post(`${this.urlApi}/package/`, pack);
  }

  //Todos los paquetes que ya esten en destino
  getPackagesInDest(): Observable<any> {                              //LISTO
    return this.httpClient.get(`${this.urlApi}/package/in-destination/`);
  }

//Todos los paquetes que estan en ruta
  getAllPackages(): Observable<Package[]> {
  return this.httpClient.get<Package[]>(`${this.url}/packages?atDestination=false&retired=false&onWay=true`);
  }

  public getPackage(id: number): Observable<any>{
    return this.httpClient.get<any>(`${GLOBAL.urlMicroserviceOperator}/package-checkpoint/${id}`);
  }

  editRetiredStatePackage(pack: Package){
    return this.httpClient.put(`${this.urlApi}/package/${pack.id}`, pack);
  }

  public getPackageInfo(packageId: number): Observable<any>{
    return this.httpClient.get<any>(`${GLOBAL.urlMicroserviceReceptionist}/package-checkpoint/${packageId}`);
  }

    /**
   * datakey: Nombre del array que contiene los datos del servidor
   * endPoint: URI
   * pagerPageKey: Nombre del parametro que representa el numero de pagina en el servidor.
   * pagerLimitKey: Nombre del parametro que representa la cantidad de elementos por pagina en el servidor.
   * totalKey: Nombre del atributo que contiene el numero total de elementos.
   */
  public getAllPackagesAtDestinationPaginated() {
    return new CustomServerDataSource(this.httpClient, {
      dataKey: 'content',
      endPoint: GLOBAL.urlMicroserviceReceptionist + '/package/in-destination/',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      totalKey: 'totalElements'
    });
  }

  public getAllPackagesOnRoutePaginated() {
    return new CustomServerDataSource(this.httpClient, {
      dataKey: 'content',
      endPoint: GLOBAL.urlMicroserviceReceptionist + '/package/on-route',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      totalKey: 'totalElements'
    });
  }

  public getPackageByInvoiceId(id: number){
    return this.httpClient.get<any>(`${GLOBAL.urlMicroserviceReceptionist}/package/trace-by-invoice/${id}`);
  }

  public getPackagesOnCheckpoint(checkpointId : number): Observable<any> {
    return this.httpClient.get<any>(`${GLOBAL.urlMicroserviceOperator}/package-checkpoint/list/${checkpointId}`);
  }
}


