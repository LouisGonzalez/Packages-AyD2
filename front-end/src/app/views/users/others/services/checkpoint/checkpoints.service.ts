import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { CheckpointListTemplate } from '../../models/checkpoint-list-template';

@Injectable({
  providedIn: 'root'
})
export class CheckpointsService {

  constructor(private http: HttpClient) { }

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
