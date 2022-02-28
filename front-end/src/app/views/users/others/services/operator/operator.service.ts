import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { Destination } from '../../models/destination';
import { Observable } from 'rxjs';
import { Operator } from '../../models/Operator';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http: HttpClient) { }

  public getOperators(pattern: string):Observable<Operator[]>{
    return this.http.get<Operator[]>(global.GLOBAL.querysUrl + "operator?cui="+pattern);
  }

}




  
