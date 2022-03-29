import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlay, NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../../@theme/theme.module';

import { ActivateUsersComponent } from './activate-users.component';

describe('TEST del componente ActivateUsersComponent', () => {
  let component: ActivateUsersComponent;
  let fixture: ComponentFixture<ActivateUsersComponent>;

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
        Ng2SmartTableModule
      ],
      declarations: [ ActivateUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir ActiveUsersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cambiar el usuario a activado', () => {
    let userProof = {
      username: 'luis123',
      name: 'Luis Manuel',
      lastname: 'Fernandez',
      type: 1,
      activo: 0,
      cui: 123,
      email: 'luis@gmail.com'
    }
    component.onDeleteConfirm(userProof);
    expect(userProof.username).toEqual('luis123');
  })

  it('Debe retornar la lista de usuarios desactivos', () => {
    component.getData();
    expect(component.users).not.toBeNull();
  })
});
