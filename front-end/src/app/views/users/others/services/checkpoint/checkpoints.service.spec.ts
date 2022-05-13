import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CheckpointListTemplate } from '../../models/checkpoint-list-template';

import { CheckpointsService } from './checkpoints.service';

describe('TEST al servicio "CheckpointsService"', () => {
  let servicePut: CheckpointsService;
  let serviceGet: CheckpointsService;
  let httpClientSpyGet: { get: jasmine.Spy}; 
  let httpClientSpyPut: { put: jasmine.Spy}; 

  beforeEach(() => {
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpyPut = jasmine.createSpyObj('HttpClient', ['put']);
    serviceGet = new CheckpointsService(httpClientSpyGet as any);
    servicePut = new CheckpointsService(httpClientSpyPut as any);
  });

  it('Debe de exisitir el Servicio Checkpoints', () => {
    expect(servicePut).toBeTruthy();
    expect(serviceGet).toBeTruthy();
  });

  it('Deberia retornar objecto checkpoint (Obtener un Checkpoint por ID)',(done: DoneFn) =>{
    let mockResult = {
      "description": "Este es un punto de control",
      "queueCapacity": 45,
      "operationFee": 25.50,
      "assignedOperator" : {
        "username": "juan123",
        "name": "Juan",
        "lastname": "Gonzales",
        "type": 2,
        "activo": true,
        "cui": 12345678,
        "email": "juan123@gmail.com"
      },
      "route": {
        "id": 1,
        "active": true,
        "name": "Ruta 1",
        "destinationId": 1,
        "packagesOnRoute": 85,
        "totalPackages": 90,
      },
      "pakageOnQueue": 45,
      "active": true,
      "id": 1
    }

    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getCheckpoint(1)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

  it('Deberia de retornar objecto checkpoint (Checkpoint- Actualizado)', (done: DoneFn) => {
    let mockCheckpoint : CheckpointListTemplate = {
      queueCapacity: 85,
      operationFee: 25.50,
      packageOnQueue: 45,
      active: "true",
      id: 1,
      route: 1,
      description: "Punto de control 1",
      assignedOperator: 1
    }

    let mockResult = {
      "description": "Este es un punto de control",
      "queueCapacity": 45,
      "operationFee": 25.50,
      "assignedOperator" : {
        "username": "juan123",
        "name": "Juan",
        "lastname": "Gonzales",
        "type": 2,
        "activo": true,
        "cui": 12345678,
        "email": "juan123@gmail.com"
      },
      "route": {
        "id": 1,
        "active": true,
        "name": "Ruta 1",
        "destinationId": 1,
        "packagesOnRoute": 85,
        "totalPackages": 90,
      },
      "pakageOnQueue": 45,
      "active": true,
      "id": 1
    }

    httpClientSpyPut.put.and.returnValue(of(mockResult));
    servicePut.putCheckpoint(mockCheckpoint, 1)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

  it('Deberia de retornar objecto checkpoint (Checkpoint - Actualizar el operador asignado)', (done: DoneFn) => {
    let employee = {
      cui: 12345678,
      name: "Manolo"
    }
    
    let mockCheckpoint : CheckpointListTemplate = {
      queueCapacity: 95,
      operationFee: 45.50,
      packageOnQueue: 43,
      active: "true",
      id: 1,
      route: 1,
      description: "Punto de control 1",
      assignedOperator: employee.cui
    }

    let mockResult = {
      "description": "Este es un punto de control",
      "queueCapacity": 95,
      "operationFee": 45.50,
      "assignedOperator" : {
        "username": "manolo123",
        "name": "Manolo",
        "lastname": "Perez",
        "type": 2,
        "activo": true,
        "cui": 12345678,
        "email": "manoloe123@gmail.com"
      },
      "route": {
        "id": 1,
        "active": true,
        "name": "Ruta 1",
        "destinationId": 1,
        "packagesOnRoute": 85,
        "totalPackages": 90,
      },
      "pakageOnQueue": 45,
      "active": true,
      "id": 1
    }

    httpClientSpyPut.put.and.returnValue(of(mockResult));
    servicePut.putOperatorCheckpoint(mockCheckpoint, 1)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

});
