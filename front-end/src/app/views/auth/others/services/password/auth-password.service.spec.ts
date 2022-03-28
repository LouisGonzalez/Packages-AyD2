import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthPasswordService } from './auth-password.service';

describe('TEST al servicio "AuthPasswordService"', () => {
  let servicePost: AuthPasswordService;
  let serviceGet: AuthPasswordService;
  let httpClientSpyPost: { post: jasmine.Spy }
  let httpClientSpyGet: { get: jasmine.Spy }

  beforeEach(() => {
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
    servicePost = new AuthPasswordService(httpClientSpyPost as any);
    serviceGet = new AuthPasswordService(httpClientSpyGet as any);
  });

  it('Se crea correctamente el Servicio AuthPassword', () => {
    expect(serviceGet).toBeTruthy();
    expect(servicePost).toBeTruthy();
  });

  it('Deberia retornar un mensaje de exito (Change Password)', (done: DoneFn) => {
    let mockChangePassword = {
      password: "12345678",
      confirmPassword: "12345678",
      tokenPassword: "safjlsafhklklsadjfhlquio"
    }
    let mockResult = {
      "message" : "Se realizo el cambio de contrasenia con exito."
    }

    httpClientSpyPost.post.and.returnValue(of(mockResult));
    servicePost.changePassword(mockChangePassword)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

  it('Debeira retornar un usuario (Buscar por correo electronico)', (done : DoneFn) => {
    let mockResult = {
      "username": "juan123",
      "email": "juan123@gmail.com",
      "name": "Juan",
      "lastname": "Gonzales",
      "type": 1,
      "activo": true,
      "cui": 123456789
    }
    let email = "juan123@gmail.com"

    httpClientSpyGet.get.and.returnValue(of(mockResult));
    serviceGet.searchUserByEmail(email)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

  it('Deberia retornar un mensaje de exito (Enviar correo para restablecer password)', (done: DoneFn) => {
    let mockSendMail = {
      mailTo: "juan123@gmail.com",
      username: "juan123",
    }
    let mockResult = {
      "message" : "Se envio el correo electronico con exito."
    }

    httpClientSpyPost.post.and.returnValue(of(mockResult));
    servicePost.sendEmail(mockSendMail)
    .subscribe(res => {
      expect(res).toEqual(mockResult);
      done();
    });
  });

});
