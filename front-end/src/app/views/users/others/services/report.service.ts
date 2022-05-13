import { Injectable } from '@angular/core';
import { GLOBAL } from '../../../GLOBAL';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  urlApi = GLOBAL.urlApi;
  urlRecep = GLOBAL.urlMicroserviceRecepcionist
  urlReport = GLOBAL.urlMicroserviceReports

  constructor(private httpClient: HttpClient) { }

  getAllClients(): Observable<any>{
    let a = this.httpClient.get(`${this.urlRecep}/client/`);
    return a;
  }

  getAllInvoices(nit: any): Observable<any> {
    let a = this.httpClient.get(`${this.urlReport}/invoice/client/${nit}`)
    return a;
  }

  getPackagesByInvoice(idInvoice: any): Observable<any> {
    let a = this.httpClient.get(`${this.urlReport}/package/invoice/${idInvoice}`)
    return a;
  }

}
