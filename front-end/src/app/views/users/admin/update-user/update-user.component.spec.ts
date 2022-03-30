import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../../@theme/theme.module';

import { UpdateUserComponent } from './update-user.component';

describe('TEST del componente UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;

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
        Ng2SmartTableModule,
      ],
      declarations: [ UpdateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.userReceive = {
      name: 'Luis',
      lastname: 'Gonzalez',
      cui: 123,
      id: 1,
      username: 'luis123',
      password: '12345678',
      type: 1,
      activo: 1,
      CUI: null,
      email: 'luis@gmail.com'
    }
  })

  it('Debe existir UpdateUserComponent', () => {
    expect(component).toBeTruthy();
  });


  it('Actualizacion de informacion de un usuario', () => {
    component.userReceive.name = "Javier";
    component.submit();
    expect(component.userReceive.name).toEqual("Javier");
  })

});
