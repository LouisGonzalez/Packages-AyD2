import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { CheckpointListTemplate } from '../../models/checkpoint-list-template';
import { User } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class CheckpointsService {

  constructor(private http: HttpClient) { }

  getAllOperators() {
    return this.http.get<User[]>(`${global.GLOBAL.url}/employees?activo=1&type=2`)
  }

  getOperator(id : number) {
    return this.http.get<any>(`${global.GLOBAL.url}/employees?activo=1&type=2&id=${id}`)
  }

  getAllCheckpoints() {
    return this.http.get<CheckpointListTemplate[]>(`${global.GLOBAL.url}/checkpoints/`)
  }
  
  getCheckpoint(id : number) {
    return this.http.get<CheckpointListTemplate>(`${global.GLOBAL.url}/checkpoints/` + id);
  }

  putCheckpoint(data : CheckpointListTemplate, id : number) {
    return this.http.put<CheckpointListTemplate>(`${global.GLOBAL.url}/checkpoints/` + id, data);
  }

}
