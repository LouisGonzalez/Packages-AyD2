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

  constructor(private http: HttpClient) {}

  postRates(data: any) {
    return this.http.post<any>(global.GLOBAL.url + "/rates/", data);
  }

  public getOperationFee(): Observable<Rate[]>{
    return this.http.get<Rate[]>(global.GLOBAL.url + "/rates?id=1")
  }

  getRates(){
    return this.http.get<Rate[]>(global.GLOBAL.url + "/rates/");
  }

  putRates(data : any, id : number) {
    return this.http.put<any>(global.GLOBAL.url + "/rates/" + id, data);
  }
}


