import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableData } from '../../../../@core/data/smart-table';
import { ThemeModule } from '../../../../@theme/theme.module';

import { ListUsersComponent } from './list-users.component';

describe('TEST del componente "ListUsersComponent"', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

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
      declarations: [ ListUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir ListUsersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cambiar el usuario a desactivado', () => {
    let userProof = {
      username: 'luis123',
      name: 'Luis Manuel',
      lastname: 'Fernandez',
      type: 1,
      activo: true,
      cui: 123,
      email: 'luis@gmail.com'
    }
    component.deactivateConfirm(userProof);
    expect(userProof.username).toEqual('luis123');
  });

  it('Debe retornar una lista de usuarios', () => {
    component.getData();
    expect(component.users).not.toBeNull();
  });


});
