import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { Observable } from 'rxjs';
import { Operator } from '../../models/Operator';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http: HttpClient) { }

  public getOperators(pattern: string):Observable<Operator[]>{
    return this.http.get<Operator[]>(global.GLOBAL.urlApi + "/employee/search-by-cui/"+pattern);
  }

  public processPackage(packageCheckpointId, data: any ){
    return this.http.patch<any>(`${global.GLOBAL.url}/package-checkpoint/${packageCheckpointId}`, data);
  }

}




  
