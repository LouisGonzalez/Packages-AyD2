import { Injectable } from '@angular/core';
import { GLOBAL } from '../../../GLOBAL';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  urlApi = GLOBAL.urlApi;

  constructor(private httpClient: HttpClient) { }

  getAllClients(): Observable<any>{
    let a = this.httpClient.get(`${this.urlApi}/client/`);
    return a;
  }

  getAllInvoices(nit: any): Observable<any> {
    let a = this.httpClient.get(`${this.urlApi}/invoice/client/${nit}`)
    return a;
  }

  getPackagesByInvoice(idInvoice: any): Observable<any> {
    let a = this.httpClient.get(`${this.urlApi}/package/invoice/${idInvoice}`)
    return a;
  }

}
