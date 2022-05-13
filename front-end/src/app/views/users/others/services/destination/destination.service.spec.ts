import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DestinationService } from './destination.service';

describe('TEST al servicio "DestinationService"', () => {
  let servicePost: DestinationService;
  let httpClientSpyPost: { post: jasmine.Spy }

  beforeEach(() => {
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
    servicePost = new DestinationService(httpClientSpyPost as any);
  });

  it('Debe de existir el Servicio Destinaion', () => {
    expect(servicePost).toBeTruthy();
  });

  it('Debe de retornar object destination (Crear Destino)', (done: DoneFn) => {
    let mockDestionation = {
      name: "Guatemala-Peten",
      description: "Destino de Guatemala a Peten",
      fee: 50.50
    }
    
    let mockResult = {
      "id" : 1,
      "name": "Guatemala-Peten",
      "description": "Destino de Guatemala a Peten",
      "fee": 50.50
    }

    httpClientSpyPost.post.and.returnValue(of(mockResult));
    servicePost.createDestination(mockDestionation)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

});
