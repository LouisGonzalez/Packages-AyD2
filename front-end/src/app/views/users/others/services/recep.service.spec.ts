import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RecepService } from './recep.service'

describe('TEST al servicio RecepService', () => {
  let servicePost: RecepService;
  let serviceGet: RecepService;
  let servicePut: RecepService;
  let httpClientSpyPost: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };
  let httpClientSpyPut: { put: jasmine.Spy };

  beforeEach(() => {
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpyPut = jasmine.createSpyObj('HttpClient', ['put']);
    servicePost = new RecepService(httpClientSpyPost as any);
    serviceGet = new RecepService(httpClientSpyGet as any);
    servicePut = new RecepService(httpClientSpyPut as any);
  });

  it('Debe existir el Servicio RecepService', () => {
    expect(servicePost).toBeTruthy();
    expect(serviceGet).toBeTruthy();
    expect(servicePut).toBeTruthy();
  });

  it('RecepService -> Debe retornar la lista de cliente', (done: DoneFn) => {
    let mockResult =
    [
      {
        name: "Jose Eduardo",
        lastname: "Galicia",
        age: 22,
        CUI: null,
        NIT: null,
        id: 1,
        cui: 123,
        nit: 555,
        address: 'Quetzaltenango',
        myInvoices: null,
        totalIngresos: null
      },
      {
        name: "Maria Jose",
        lastname: "Villagran",
        age: 24,
        CUI: null,
        NIT: null,
        id: 2,
        cui: 124,
        nit: 556,
        address: 'Quetzaltenango',
        myInvoices: null,
        totalIngresos: null
      }
    ]
    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getAllClients()
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    })
  })

  it('RecepService -> Debe retornar un objeeto Cliente especifico', (done: DoneFn) => {
    let mockResult = {
      name: "Maria Jose",
      lastname: "Villagran",
      age: 24,
      CUI: null,
      NIT: null,
      id: 1,
      cui: 124,
      nit: 556,
      address: 'Quetzaltenango',
      myInvoices: null,
      totalIngresos: null
    }
    servicePost.addClient(mockResult);
    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getClient(556)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    })
  })

  it('RecepService -> Debe retornar al objeto del cliente creado', (done: DoneFn) => {
    let mockClient = {
      name: "Maria Jose",
      lastname: "Villagran",
      age: 24,
      CUI: null,
      NIT: null,
      id: 1,
      cui: 124,
      nit: 556,
      address: 'Quetzaltenango',
      myInvoices: null,
      totalIngresos: null
    }
    let mockResult = {
      name: "Maria Jose",
      lastname: "Villagran",
      age: 24,
      CUI: null,
      NIT: null,
      id: 1,
      cui: 124,
      nit: 556,
      address: 'Quetzaltenango',
      myInvoices: null,
      totalIngresos: null
    }
    httpClientSpyPost.post.and.returnValue(of(mockResult));
    servicePost.addClient(mockClient)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    })
  })

  it('RecepService -> Debe retornar el listado de destinos', (done: DoneFn) => {
    let mockResult =
    [
      {
        id: 1,
        name: 'Paris',
        description: 'De guate a paris',
        fee: 200
      },
      {
        id: 2,
        name: 'Madrid',
        description: 'De guate a madrid',
        fee: 350
      }
    ]
    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getAllDestinys()
    .subscribe(res => {
      expect(res).toEqual(mockResult)
      done();
    })
  })

  it('RecepService -> Debe retornar un listado de rutas por destino', (done: DoneFn) => {
    let mockRoute = [
      {
        id: 1,
        active: true,
        name: 'Ruta 1',
        destinationId: 1,
        packagesOnRoute: 2,
        totalPackages: 22
      },
      {
        id: 2,
        active: true,
        name: 'Ruta 2',
        destinationId: 1,
        packagesOnRoute: 2,
        totalPackages: 40
      }
    ]
    httpClientSpyGet.get.and.returnValue(of(mockRoute));
    serviceGet.getRouteByDestiny(1)
    .subscribe(res => {
      expect(res).toEqual(mockRoute)
      done()
    })
  });

  it('RecepService -> Debe retornar un objeto destino encontrado mediante su Id', (done: DoneFn) => {
    let mockResult = {
        id: 1,
        name: 'Paris',
        description: 'De guate a paris',
        fee: 200
    }
    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getDestinyById(1)
    .subscribe(res => {
      expect(res).toEqual(mockResult)
      done()
    })
  })

  it('RecepService -> Debe retornar el objeto de la factura generada', (done: DoneFn) => {
    let mockInvoice = {
      id: null,
      nitClient: 555,
      subTotal: 200,
      total: 200,
      dateEmit: '2020-05-02',
      nit: 555,
      myPackages: null
    }
    let mockResult = {
      id: 1,
      nitClient: 555,
      subTotal: 200,
      total: 200,
      dateEmit: '2020-05-02',
      nit: 555,
      myPackages: null
    }
    httpClientSpyPost.post.and.returnValue(of(mockResult))
    servicePost.createInvoice(mockInvoice)
    .subscribe(res => {
      expect(res).toEqual(mockResult)
      done()
    })
  })

  it('RecepService -> Debe retornar el objeto del paquete creado', (done: DoneFn) => {
    let mockPackage = {
      id: null,
      idClient: null,
      route: null,
      onWay: true,
      atDestination: false,
      retired: false,
      weight: 100,
      noInvoice: 1,
      invoice: null,
      unitTotal: 400,
      description: 'es un paquete',
      priority: false
    }
    let mockResult = {
      id: 1,
      idClient: null,
      route: null,
      onWay: true,
      atDestination: false,
      retired: false,
      weight: 100,
      noInvoice: 1,
      invoice: null,
      unitTotal: 400,
      description: 'es un paquete',
      priority: false
    }
    httpClientSpyPost.post.and.returnValue(of(mockResult));
    servicePost.creaatePackage(mockPackage)
    .subscribe(res => {
      expect(res).toEqual(mockResult)
      done()
    })
  })


})
