import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminService } from './admin.service';

describe('TEST al servicio AdminService', () => {
  let servicePost: AdminService;
  let serviceGet: AdminService;
  let servicePut: AdminService;
  let httpClientSpyPost: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };
  let httpClientSpyPut: { put: jasmine.Spy }

  beforeEach(() => {
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpyPut = jasmine.createSpyObj('HttpClient', ['put']);
    servicePost = new AdminService(httpClientSpyPost as any);
    serviceGet = new AdminService(httpClientSpyGet as any);
    servicePut = new AdminService(httpClientSpyPut as any);
  });

  it('AdminService -> Debe de existir el servicio Admin', () => {
    expect(servicePost).toBeTruthy();
    expect(serviceGet).toBeTruthy();
    expect(servicePut).toBeTruthy();
  })

  it('AdminService -> Debe retornar la lista de empleados activos', (done: DoneFn) => {
    let mockResult =
    [
      {
        "username": "luis123",
        "password": "12345678",
        "name": "Luis Manuel",
        "lastname": "Garcia",
        "id": 1,
        "type": 1,
        "activo": true,
        "CUI": null,
        "cui": 123,
        "email": "luis@gmail.com"
      },
      {
        "username": "fernando123",
        "password": "12345678",
        "name": "Fernando Jose",
        "lastname": "Marquez",
        "id": 2,
        "type": 1,
        "activo": true,
        "CUI": null,
        "cui": 124,
        "email": "fernando@gmail.com"
      }
    ]
    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getAllActivates()
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    })
  });

  it('AdminService -> Debe retornar la lista de empleados desactivados', (done: DoneFn) => {
    let mockResult =
    [
      {
        "username": "luis123",
        "password": "12345678",
        "name": "Luis Manuel",
        "lastname": "Garcia",
        "id": 1,
        "type": 1,
        "activo": false,
        "CUI": null,
        "cui": 123,
        "email": "luis@gmail.com"
      },
      {
        "username": "fernando123",
        "password": "12345678",
        "name": "Fernando Jose",
        "lastname": "Marquez",
        "id": 2,
        "type": 1,
        "activo": false,
        "CUI": null,
        "cui": 124,
        "email": "fernando@gmail.com"
      }
    ]
    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getAllDeactivates()
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    })
  });

  it('AdminService -> Debe retornar el objeto employee actualizado', (done: DoneFn) => {
    let mockEmployee = {
      username: "luis123",
      password: "12345678",
      name: "Luis Manuel",
      lastname: "Garcia",
      id: 1,
      type: 1,
      activo: 1,
      CUI: null,
      cui: 123,
      email: "luis@gmail.com"
    }
    let mockResult = {
      username: "luis123",
      password: "1234665",
      name: "Luis Manuel",
      lastname: "Garcia Fernandez",
      id: 1,
      type: 1,
      activo: 1,
      CUI: null,
      cui: 123,
      email: "luis@gmail.com"
    }
    httpClientSpyPut.put.and.returnValue(of(mockResult));
    servicePut.updateUser(mockEmployee)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    })
  })

  it('AdminService -> Debe retornar al objeto del empleado creado', (done: DoneFn) => {
    let mockEmployee = {
      username: "luis123",
      password: "12345678",
      name: "Luis Manuel",
      lastname: "Garcia",
      id: null,
      type: 1,
      activo: 1,
      CUI: null,
      cui: 123,
      email: "luis@gmail.com"
    }
    let mockResult = {
      username: "luis123",
      password: "12345678",
      name: "Luis Manuel",
      lastname: "Garcia",
      id: 1,
      type: 1,
      activo: 1,
      CUI: null,
      cui: 123,
      email: "luis@gmail.com"
    }
    httpClientSpyPost.post.and.returnValue(of(mockResult));
    servicePost.add(mockEmployee)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    })
  })

  it('AdminService -> Debe retornar la lista de rutas', (done: DoneFn) => {
    let mockResult =
    [
      {
        id: 1,
        active: true,
        name: 'Ruta 1',
        destinationId: 1,
        packagesOnRoute: 2,
        totalPackages: 10
      },
      {
        id: 2,
        active: true,
        name: 'Ruta 2',
        destinationId: 1,
        packagesOnRoute: 2,
        totalPackages: 10
      },
      {
        id: 3,
        active: true,
        name: 'Ruta 3',
        destinationId: 1,
        packagesOnRoute: 2,
        totalPackages: 10
      },
    ]
    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getAllRoutes()
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    })
  })

})
