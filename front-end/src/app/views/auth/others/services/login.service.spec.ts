import { ComponentFixture, TestBed } from '@angular/core/testing'
import { doesNotReject } from 'assert'
import { of } from 'rxjs'
import { LoginService } from './login.service'

describe('TEST al servicio LoginService', () => {
  let component: LoginService
  let servicePost: LoginService
  let fixture: ComponentFixture<LoginService>
  let httpClientSpyPost: { post: jasmine.Spy }

  beforeEach(() => {
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post'])
    servicePost = new LoginService(httpClientSpyPost as any)
    fixture = TestBed.createComponent(LoginService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })


  it('LoginService => Debe existir el servicio Login', () => {
    expect(servicePost).toBeTruthy();
  })

  it('LoginService => El usersession debe ser falso', () => {
    let boolSes = false
    expect(component.setUserSesion(boolSes)).toBeFalsy();
  })

  it('LoginSesrvice -> El usersession debe ser verdadero', () => {
    let boolSes = true
    expect(component.setUserSesion(boolSes)).toBeTruthy();
  })

  it('LoginService => GetIdentite devuelve un valor nulo', () => {
    localStorage.setItem('user', undefined);
    component.getIdentity()
    expect(component.user).toBeNull();
  })

  it('LoginService => GetIdentity devuelve un usuario', () => {
    let user = {
      username: 'luis1',
      password: '12345678',
      name: 'Manuel',
      lastname: 'gomez',
      id: 1,
      type: 1,
      activo: 1,
      CUI: 11,
      cui: 11,
      email: 'asdf@gmail.com'
    }
    localStorage.setItem('user', JSON.stringify(user))
    component.getIdentity()
    expect(component.user).toEqual(user)
  })

  it('LoginService => GetTypeIdentity devuelve un usuario nulo', () =>{
    localStorage.setItem('user', undefined)
    component.getTypeIdentity(1)
    expect(component.user).toBeNull();
  })

  it('LoginService => GetTypeIdentity los tipos de usuarios son incorrectos', () => {
    let user = {
      username: 'luis1',
      password: '12345678',
      name: 'Manuel',
      lastname: 'gomez',
      id: 1,
      type: 1,
      activo: 1,
      CUI: 11,
      cui: 11,
      email: 'asdf@gmail.com'
    }
    localStorage.setItem('user', JSON.stringify(user))
    component.getTypeIdentity(2)
    expect(component.user).toBeNull();
  })

  it('LoginService => GetTypeIdentity los tipos de usuario coinciden', () => {
    let user = {
      username: 'luis1',
      password: '12345678',
      name: 'Manuel',
      lastname: 'gomez',
      id: 1,
      type: 1,
      activo: 1,
      CUI: 11,
      cui: 11,
      email: 'asdf@gmail.com'
    }
    localStorage.setItem('user', JSON.stringify(user))
    component.getTypeIdentity(1)
    expect(component.user).toEqual(user)
  })

  it('LoginService => Retorna el objeto solicitado mediante post', () => {
    let user = {
      username: 'luis1',
      password: '12345678',
      name: 'Manuel',
      lastname: 'gomez',
      id: 1,
      type: 1,
      activo: 1,
      CUI: 11,
      cui: 11,
      email: 'asdf@gmail.com'
    }
    httpClientSpyPost.post.and.returnValue(of(user))
    servicePost.login('luis123', '12345678')
    .subscribe(res => {
      expect(res).toBeNull()
    })
  })



})
