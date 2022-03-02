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

@Injectable({
  providedIn: 'root'
})
export class RecepService {

  url = GLOBAL.url;
  public client = null;

  constructor(private httpClient: HttpClient) { }


  //Querys relacionadas a clientes
  getAllClients(): Observable<Client[]>{
    let a = this.httpClient.get<Client[]>(`${this.url}/clients`);
    return a;
  }

  getClient(nit: number): Observable<Client[]>{
    let a = this.httpClient.get<Client[]>(`${this.url}/clients?NIT=${nit}`);
    return a;
  }

  addClient(client: Client): Observable<any>{
    return this.httpClient.post(`${this.url}/clients`, client);
  }

  //Querys relacionadas a destinos
  getAllDestinys(): Observable<Destination[]>{
    let a = this.httpClient.get<Destination[]>(`${this.url}/destination`);
    return a;
  }

  //busca de rutas segun destino
  getRouteByDestiny(idDestiny: number): Observable<Route[]>{
    let a = this.httpClient.get<Route[]>(`${this.url}/route?destinationId=${idDestiny}`);
    return a;
  }

  getDestinyById(idDestiny: number): Observable<Destination[]>{
    let a = this.httpClient.get<Destination[]>(`${this.url}/destination?id=${idDestiny}`);
    return a;
  }

  createInvoice(invoice: Invoice): Observable<any>{
    return this.httpClient.post(`${this.url}/invoice`, invoice);
  }

  creaatePackage(pack: Package): Observable<any>{
    return this.httpClient.post(`${this.url}/packages`, pack);
  }

  //Todos los paquetes que ya esten en destino
  getPackagesInDest(): Observable<Package[]> {
    return this.httpClient.get<Package[]>(`${this.url}/packages?atDestination=true&retired=false`);
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
    return this.httpClient.put(`${this.url}/packages/${pack.id}`, pack);
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

}


