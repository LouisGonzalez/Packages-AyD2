import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../GLOBAL';
import { Client } from '../models/Client';
@Injectable({
  providedIn: 'root'
})
export class RecepService {

  url = GLOBAL.url;
  public client = null;

  constructor(private httpClient: HttpClient) { }

  getAllClients(): Observable<Client[]>{
    let a = this.httpClient.get<Client[]>(`${this.url}/clients`);
    return a;
  }

  addClient(client: Client): Observable<any>{
    return this.httpClient.post(`${this.url}/clients`, client);
  }

}


