import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';

import { ProfileComponent } from './profile.component';

describe('TEST del componente ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

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
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el componente ProfileComponente', () => {
    component.user = JSON.parse(localStorage.getItem('user'));
    expect(component).toBeTruthy();
  });

  it('La informacion del perfil de usuario no debe ser nula', () => {
    let user = {
      name: "Juan Garcia"
    }
    localStorage.setItem('user', JSON.stringify(user));
    component.user = JSON.parse(localStorage.getItem('user'));
    expect(component.user.name).not.toBeNull();
  })
});
