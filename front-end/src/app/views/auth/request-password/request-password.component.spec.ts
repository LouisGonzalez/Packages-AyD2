import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';

import { RequestPasswordComponent } from './request-password.component';

describe('TEST del componente "RequestPasswordComponent"', () => {
  let component: RequestPasswordComponent;
  let fixture: ComponentFixture<RequestPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule, 
        NbToastrModule.forRoot(),
        NbOverlayModule.forRoot(),
        ThemeModule.forRoot(),
        RouterTestingModule,
        FormsModule, 
        ReactiveFormsModule,
      ],
      declarations: [ RequestPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el RequestPassword', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de retornar el formulario valido', () => {
    let email = component.form.controls['email'];
    email.setValue('juan123@gmail.com');
    expect(component.form.invalid).toBeFalsy();
  });

  it ('Formulario invalido', () => {
    let email = component.user.email
    email = ('juan123@gmail.com');
    component.requestPass()
    expect(component.form.valid).toBeFalsy()
  })

  it ('Formulario valido', () => {
    component.user.email = 'juan123@gmail.com';
    component.requestPass()
    expect(component.form.valid).toBeTruthy()
  })

  it ('Search User By Email, Fail', () => {
    let email = 'juan123@gmail.com';
    component.searchUserByEmail(email)
    expect(component.showMessages.error).toBeFalsy()
  })

  it ('Send Email Forgot Password, Fail', () => {
    let email = 'juan123@gmail.com';
    let username = 'juan123';
    component.sendEmailForgotPassword(email, username)
    expect(component.showMessages.error).toBeFalsy()
  })

});
