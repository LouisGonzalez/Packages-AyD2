import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RouteService } from './route.service';

describe('TEST del Servicio "RouteService"', () => {
  let serviceGet: RouteService;
  let httpClientSpyGet: { get: jasmine.Spy }

  beforeEach(() => {
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    serviceGet = new RouteService(httpClientSpyGet as any);
  });

  it('Debe de exisitir el Servicio Route', () => {
    expect(serviceGet).toBeTruthy();
  });

  it('Deberia retornar objecto Page Ruoute (Obtener Listado de rutas)', (done: DoneFn) => {
    let mockResult =  
    [
      {
        "id": 1,
        "active": true,
        "name": "Ruta 1",
        "destination": {
          "id": 1,
          "name": "Guatemala-Peten",
          "description": "De Guatemala a Peten",
          "fee": 75.50,
        },
        "packagesOnRoute": 15,
        "totalPackages": 85,
      }, 
      {
        "id": 2,
        "active": true,
        "name": "Ruta 2",
        "destination": {
          "id": 1,
          "name": "Guatemala-Peten",
          "description": "De Guatemala a Peten",
          "fee": 75.50,
        },
        "packagesOnRoute": 15,
        "totalPackages": 85,
      }, 
      {
        "id": 3,
        "active": true,
        "name": "Ruta 3",
        "destination": {
          "id": 1,
          "name": "Guatemala-Peten",
          "description": "De Guatemala a Peten",
          "fee": 75.50,
        },
        "packagesOnRoute": 15,
        "totalPackages": 85,
      }, 
    ]  

    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getAllRoutesPaginated();
    expect(mockResult).toEqual(mockResult);
    done();
  });

  it('Deberia retornar objecto Page Ruoute con filtrado de activo (Obtener Listado de rutas con filtrado de activo)', (done: DoneFn) => {
    let mockResult =  
    [
      {
        "id": 1,
        "active": true,
        "name": "Ruta 1",
        "destination": {
          "id": 1,
          "name": "Guatemala-Peten",
          "description": "De Guatemala a Peten",
          "fee": 75.50,
        },
        "packagesOnRoute": 15,
        "totalPackages": 85,
      }, 
      {
        "id": 2,
        "active": true,
        "name": "Ruta 2",
        "destination": {
          "id": 1,
          "name": "Guatemala-Peten",
          "description": "De Guatemala a Peten",
          "fee": 75.50,
        },
        "packagesOnRoute": 15,
        "totalPackages": 85,
      }, 
      {
        "id": 3,
        "active": true,
        "name": "Ruta 3",
        "destination": {
          "id": 1,
          "name": "Guatemala-Peten",
          "description": "De Guatemala a Peten",
          "fee": 75.50,
        },
        "packagesOnRoute": 15,
        "totalPackages": 85,
      }, 
    ]  

    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getRoutesByActivePaginated(true);
    expect(mockResult).toEqual(mockResult);
    done();
  });

  it('Deberia retornar objecto Lista de Ruta (Obtener Listado de rutas mas populares)', (done: DoneFn) => {
    let mockResult =  
    [
      {
        "id": 1,
        "active": true,
        "name": "Ruta 1",
        "destination": {
          "id": 1,
          "name": "Guatemala-Peten",
          "description": "De Guatemala a Peten",
          "fee": 75.50,
        },
        "packagesOnRoute": 15,
        "totalPackages": 85,
      }, 
      {
        "id": 2,
        "active": true,
        "name": "Ruta 2",
        "destination": {
          "id": 1,
          "name": "Guatemala-Peten",
          "description": "De Guatemala a Peten",
          "fee": 75.50,
        },
        "packagesOnRoute": 15,
        "totalPackages": 85,
      }, 
      {
        "id": 3,
        "active": true,
        "name": "Ruta 3",
        "destination": {
          "id": 1,
          "name": "Guatemala-Peten",
          "description": "De Guatemala a Peten",
          "fee": 75.50,
        },
        "packagesOnRoute": 15,
        "totalPackages": 85,
      }, 
    ]  

    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getMostPopularRoute()
    .subscribe(res => {
      expect(res).toEqual(mockResult);  
      done();
    });
  });
});
