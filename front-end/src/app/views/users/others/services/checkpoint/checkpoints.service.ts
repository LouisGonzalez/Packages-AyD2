import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { CheckpointListTemplate } from '../../models/checkpoint-list-template';
import { User } from '../../models/employee';
import { CustomServerDataSource } from '../../models/CustomServerDataSource';

@Injectable({
  providedIn: 'root'
})
export class CheckpointsService {

  constructor(private http: HttpClient) { }

  getAllOperators() {
    return this.http.get<User[]>(`${global.GLOBAL.url}/employees?activo=1&type=2`)
  }

  getAllCheckpoints() {
    return this.http.get<CheckpointListTemplate[]>(`${global.GLOBAL.url}/checkpoints/`)
  }

    /**
   * datakey: Nombre del array que contiene los datos del servidor
   * endPoint: URI 
   * pagerPageKey: Nombre del parametro que representa el numero de pagina en el servidor.
   * pagerLimitKey: Nombre del parametro que representa la cantidad de elementos por pagina en el servidor.
   * totalKey: Nombre del atributo que contiene el numero total de elementos.
   */
    public getAllCheckpointsPaginated() {
      return new CustomServerDataSource(this.http, {
        dataKey: 'content',
        endPoint: global.GLOBAL.urlMicroserviceAdministration + '/checkpoint/list',
        pagerPageKey: 'page', 
        pagerLimitKey: 'size', 
        totalKey: 'totalElements' 
      });
    }
  
  getAllCheckpointsAssignedToOperator(operatorId: number) {
    return this.http.get<CheckpointListTemplate[]>(`${global.GLOBAL.urlMicroserviceOperator}/checkpoint/list/${operatorId}`)
  }

  getCheckpoint(id : number) {
    return this.http.get<any>(`${global.GLOBAL.urlMicroserviceAdministration}/checkpoint/` + id);
  }

  putCheckpoint(data : CheckpointListTemplate, id : number) {
    return this.http.put<any>(`${global.GLOBAL.urlMicroserviceAdministration}/checkpoint/update/` + id, data);
  }

  putOperatorCheckpoint(data : CheckpointListTemplate, id : number) {
    return this.http.put<any>(`${global.GLOBAL.urlMicroserviceAdministration}/checkpoint/operator/` + id, data);
  }

  public deleteCheckpoint(id : number) {
    return this.http.delete<any>(`${global.GLOBAL.urlMicroserviceAdministration}/checkpoint/` + id);
  }

}
