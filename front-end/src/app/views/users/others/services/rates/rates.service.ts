import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as global from "../../../../GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) {}

  postRates(data: any) {
    return this.http.post<any>(global.GLOBAL.url + "rates/", data);
  }
}
