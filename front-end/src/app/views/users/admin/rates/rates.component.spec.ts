import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { RatesComponent } from './rates.component';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TEST del componente "RatesComponent"', () => {
  let component: RatesComponent;
  let fixture: ComponentFixture<RatesComponent>;

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
      declarations: [ RatesComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el RatesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar el formulario valido', () => {
    let operatorFee = component.formRates.controls['operatorFee'];
    let priorizationFee = component.formRates.controls['priorizationFee'];
    let pricePerPound = component.formRates.controls['pricePerPound'];

    operatorFee.setValue('15.50');
    priorizationFee.setValue('18.50');
    pricePerPound.setValue('19.50');

    expect(component.formRates.invalid).toBeFalsy();
  });
});
