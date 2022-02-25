import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../../GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class CheckpointsService {

  constructor(private http: HttpClient) { }

  getAllCheckpoints() {
    return this.http.get<any>(`${global.GLOBAL.url}/checkpoints/`)
  }
  
  getCheckpoint(id : number) {
    return this.http.get<any>(`${global.GLOBAL.url}/checkpoints/` + id);
  }
}
