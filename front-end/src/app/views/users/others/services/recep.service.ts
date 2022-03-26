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

@Injectable({
  providedIn: 'root'
})
export class RecepService {

  url = GLOBAL.url;
  urlApi = GLOBAL.urlApi;
  public client = null;

  constructor(private httpClient: HttpClient) { }


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

   //Todos los paquetes que ya esten en destino
   getPackagesInCheckpoint(checkpointId:number): Observable<Package[]> {
    return this.httpClient.get<Package[]>(`${this.url}/package-checkpoint?checkpoint=${checkpointId}&processed=false`);
  }

//Todos los paquetes que estan en ruta
  getAllPackages(): Observable<Package[]> {
  return this.httpClient.get<Package[]>(`${this.url}/packages?atDestination=false&retired=false&onWay=true`);
  }

  getPackage(id: number): Observable<Package>{
    return this.httpClient.get<Package>(`${this.url}/packages?id=${id}`);
  }

  editRetiredStatePackage(pack: Package){
    return this.httpClient.put(`${this.urlApi}/package/${pack.id}`, pack);
  }

  /**
   * No exite ningun recurso en el json server que permita obtener los datos
   * requeridos, se debe de modificar la uri cuando ya se tenga la implementacion
   * en el backen.
   * @param packageId Id del paquete a obtener informacion.
   * @returns
   */
  public getPackageInfo(packageId: number): Observable<PackageInformation>{
    return this.httpClient.get<PackageInformation>(`${this.url}/packages/${packageId}`);
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
          endPoint: this.urlApi + '/package/in-destination/',
          pagerPageKey: 'page', 
          pagerLimitKey: 'size', 
          totalKey: 'totalElements' 
        });
      }

}


