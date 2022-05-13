import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RatesService } from './rates.service';

describe('TEST al servicio "RatesService"', () => {
  let servicePost: RatesService;
  let serviceGet: RatesService;
  let servicePut: RatesService;
  let httpClientSpyPost: { post: jasmine.Spy};
  let httpClientSpyGet: { get: jasmine.Spy};
  let httpClientSpyPut: { put: jasmine.Spy};

  beforeEach(() => { 
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpyPut = jasmine.createSpyObj('HttpClient', ['put']);
    servicePost = new RatesService(httpClientSpyPost as any);
    serviceGet = new RatesService(httpClientSpyGet as any);
    servicePut = new RatesService(httpClientSpyPut as any);
  });

  it('Debe de exisitir el Servicio Rate ', () => {
    expect(servicePost).toBeTruthy();
    expect(serviceGet).toBeTruthy();
    expect(servicePut).toBeTruthy();
  });

  it('Deberia retornar objecto rate (Tarifa Actualizada)', (done: DoneFn) => {
    let mockRate = {
      name: 'Tarifa por Operacion',
      fee: 15.50
    }
    let mockResult =
    {
      "id": 1,
      "name": "Tarifa por operacion",
      "fee": 25.50
    }

    httpClientSpyPut.put.and.returnValue(of(mockResult));
    servicePut.putRates(mockRate, 1)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

  it('Deberia retornar objecto rate (Tarifa creada)', (done: DoneFn) => {
    let mockRate = {
      name: 'Tarifa por Operacion',
      fee: 15.50
    }
    let mockResult = {
      "data": {
        "id": 1,
        "name": "Tarifa por operacion",
        "fee": 15.50
      }
    }

    httpClientSpyPost.post.and.returnValue(of(mockResult));
    servicePost.postRates(mockRate)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

  it('Deberia retornar object rate (Obtener tarfias)', (done: DoneFn) => {
    let mockResult =
    [
      {
        "id": 1,
        "name": "Tarifa por operacion",
        "fee": 15.50
      },
      {
        "id": 2,
        "name": "Tarifa por peso",
        "fee": 25.50
      },
      {
        "id": 3,
        "name": "Tarifa por priorizacion",
        "fee": 35.50
      },
    ]

    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getRates()
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

  it('Deberia retornar object rate (Obtener tarfias - Lista Observable)', (done: DoneFn) => {
    let mockResult =
    [
      {
        "id": 1,
        "name": "Tarifa por operacion",
        "fee": 15.50
      },
      {
        "id": 2,
        "name": "Tarifa por peso",
        "fee": 25.50
      },
      {
        "id": 3,
        "name": "Tarifa por priorizacion",
        "fee": 35.50
      },
    ]

    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.getOperationFee()
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

});
