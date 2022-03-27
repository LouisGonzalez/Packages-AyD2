import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';

import { ResetPasswordComponent } from './reset-password.component';

describe('TEST del componente "ResetPasswordComponent"', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

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
      declarations: [ ResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de existir el ResetPassword', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de retornar el formulario valido', () => {
    let password = component.form.controls['password'];
    let confirmPassword = component.form.controls['confirmPassword'];
    password.setValue('Manager1');
    confirmPassword.setValue('Manager1');
    expect(component.form.invalid).toBeFalsy();
  });

  it('Las constrasenias deben de coincidir', () => {
    let password = component.form.controls['password'];
    let confirmPassword = component.form.controls['confirmPassword'];
    password.setValue('Manager1');
    confirmPassword.setValue('Manager1');
    expect(component.form.get('password').value).toEqual(component.form.get('confirmPassword').value);
  });
});
