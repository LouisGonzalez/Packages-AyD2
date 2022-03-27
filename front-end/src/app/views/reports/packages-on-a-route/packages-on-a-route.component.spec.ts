import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';

import { PackagesOnARouteComponent } from './packages-on-a-route.component';

describe('TEST del componente "PackagesOnARouteComponent"', () => {
  let component: PackagesOnARouteComponent;
  let fixture: ComponentFixture<PackagesOnARouteComponent>;

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
      declarations: [ PackagesOnARouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesOnARouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de existir el PackagesOnARouteComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Cambio de estado para la busqueda de Rutas', () => {
    component.on = false;
    expect(component.on).toBeFalsy();
  });
});
