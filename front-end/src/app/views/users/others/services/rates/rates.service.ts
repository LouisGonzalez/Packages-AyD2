import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Rate } from '../../models/rate';
import * as global from "../../../../GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) {}

  postRates(data: any) {
    return this.http.post<any>(global.GLOBAL.url + "/rates/", data);
  }

  getRates(){
    return this.http.get<Rate[]>(global.GLOBAL.url + "/rates/");
  }

  putRates(data : any, id : number) {
    return this.http.put<any>(global.GLOBAL.url + "/rates/" + id, data);
  }
}
