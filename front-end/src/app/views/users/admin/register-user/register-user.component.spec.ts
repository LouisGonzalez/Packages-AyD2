import { HttpClientTestingModule } from '@angular/common/http/testing';
import { forwardRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';

import { RegisterUserComponent } from './register-user.component';

describe('TEST del componente RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NbToastrModule.forRoot(),
        NbOverlayModule.forRoot(),
        ThemeModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => RegisterUserComponent),
        }
      ],
      declarations: [ RegisterUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el componente RegisterUserComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar el formulario de registro de usuarios invalido', () => {
    let username = component.form.controls['username'];
    username.setValue('Juan Gomez');
    expect(component.form.invalid).toBeTruthy();
  })

  it('Debe retornar el formulario de registro de usuarios valido', () => {
    component.form.controls['username'].setValue('luis123');
    component.form.controls['name'].setValue('Luis');
    component.form.controls['lastname'].setValue('Gonzalez');
    component.form.controls['password'].setValue('12345678');
    component.form.controls['repitPassword'].setValue('12345678');
    component.form.controls['cui'].setValue('123');
    component.form.controls['type'].setValue(1);
    component.form.controls['activo'].setValue(true);
    component.form.controls['email'].setValue('luisgonzalez@gmail.com');
    expect(component.form.valid).toBeTruthy();

  })

});
