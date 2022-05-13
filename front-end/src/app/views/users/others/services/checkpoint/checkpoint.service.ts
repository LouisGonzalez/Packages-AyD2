import { Injectable } from '@angular/core';
import { Route } from '../../models/Route';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../../GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckpointService {

  constructor(private http: HttpClient) { }

  createCheckpoint(checkpointData: any){
    return this.http.post<any>(global.GLOBAL.urlMicroserviceAdministration + "/checkpoint", checkpointData);
  }

}
