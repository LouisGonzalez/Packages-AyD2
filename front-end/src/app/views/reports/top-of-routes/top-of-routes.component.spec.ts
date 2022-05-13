import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';

import { TopOfRoutesComponent } from './top-of-routes.component';

describe('TEST del componente "TopOfRoutesComponent"', () => {
  let component: TopOfRoutesComponent;
  let fixture: ComponentFixture<TopOfRoutesComponent>;

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
      declarations: [ TopOfRoutesComponent ],
      providers: [DatePipe],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopOfRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia de existir el TopOfRoutesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia de agregar una nueva Ruta al Top', () => {
    component.addNewTop("Ruta 1", 500, "Guatemala-Peten");
    expect(component.results.length).toEqual(1);
    expect(component.progressInfoData.length).toEqual(1);
  });

  it('Range Date Null', () => {
    let date = {
      queue: null
    }
    component.range(date)
    expect(true).toBeTruthy()
  });

  it('Range End Date Null', () => {
    let date = {
      queue: {
        start: '2018-02-03',
        end: null
      }
    }
    component.range(date)
    expect(true).toBeTruthy();
  });

  it('Range Date Success', () => {
    let date = {
      queue: {
        start: '2018-02-03',
        end: '2018-04-04'
      }
    }
    component.range(date)
    expect(true).toBeTruthy();
  });

});
