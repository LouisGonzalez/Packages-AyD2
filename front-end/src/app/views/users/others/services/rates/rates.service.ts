import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import * as global from "../../../../GLOBAL";
import { Rate } from "../../models/rate";

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor (private http: HttpClient) {}

  public postRates(data: any) {
    return this.http.post<any>(global.GLOBAL.urlMicroserviceAdministration + "/fee/", data);
  }

  public getOperationFee(): Observable<Rate[]>{
    return this.http.get<Rate[]>(global.GLOBAL.urlMicroserviceAdministration + "/fee/")
  }

  public getRates(){
    return this.http.get<Rate[]>(global.GLOBAL.urlMicroserviceAdministration + "/fee/");
  }

  public putRates(data : any, id : number) {
    return this.http.put<any>(global.GLOBAL.urlMicroserviceAdministration + "/fee/" + id, data);
  }
}


