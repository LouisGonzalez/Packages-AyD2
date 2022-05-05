import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { RatesComponent } from './rates.component';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatesService } from '../../others/services/rates/rates.service';
import { of } from 'rxjs';

describe('TEST del componente "RatesComponent"', () => {
  let component: RatesComponent;
  let fixture: ComponentFixture<RatesComponent>;
  let servicePost: RatesService;
  let serviceGet: RatesService;
  let servicePut: RatesService;
  let httpClientSpyPost: { post: jasmine.Spy};
  let httpClientSpyGet: { get: jasmine.Spy};
  let httpClientSpyPut: { put: jasmine.Spy};

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
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpyPut = jasmine.createSpyObj('HttpClient', ['put']);
    servicePost = new RatesService(httpClientSpyPost as any);
    serviceGet = new RatesService(httpClientSpyGet as any);
    servicePut = new RatesService(httpClientSpyPut as any);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el RatesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('set_rate, formulario valido', () => {
    let operatorFeeR = {
      name : "Tarifa por operación",
      fee: 15.50
    }
    let priorizationFeeR = {
      name : "Tarifa por priorización",
      fee: 5.50
    }
    let pricePerPoundR = {
      name : "Tarifa por peso",
      fee: 10.50
    }
    let data = [operatorFeeR, priorizationFeeR, pricePerPoundR]
    component.datarates = data
    let mockResult =
    {
      "id": 1,
      "name": "Tarifa por operacion",
      "fee": 25.50
    }
    httpClientSpyPut.put.and.returnValue(of(mockResult));
    let operatorFee = component.formRates.controls['operatorFee'];
    let priorizationFee = component.formRates.controls['priorizationFee'];
    let pricePerPound = component.formRates.controls['pricePerPound'];
    operatorFee.setValue('15.50');
    priorizationFee.setValue('18.50');
    pricePerPound.setValue('19.50');
    component.set_rates()
    expect(component.formRates.valid).toBeTruthy();
    
  });

  it('set_rate, formulario invalido', () => {
    component.formRates.controls['operatorFee'].setValue(-1)
    component.formRates.controls['priorizationFee'].setValue(-1)
    component.formRates.controls['pricePerPound'].setValue(-1)
    component.set_rates()
    expect(component.formRates.valid).toBeFalsy();
  });

  it('Button Cancel', () => {
    component.onCancel()
    expect(component.formRates.valid).toBeTruthy();
  });

  it('add_field', () => {
    let operatorFee = {
      name : "Tarifa por operación",
      fee: 15.50
    }
    let priorizationFee = {
      name : "Tarifa por priorización",
      fee: 5.50
    }
    let pricePerPound = {
      name : "Tarifa por peso",
      fee: 10.50
    }
    let data = [operatorFee, priorizationFee, pricePerPound]
    component.addField(data)
    expect(component.datarates).toEqual(data);
  });

  it('get_rate', () => {
    let operatorFee = {
      name : "Tarifa por operación",
      fee: 15.50
    }
    let priorizationFee = {
      name : "Tarifa por priorización",
      fee: 5.50
    }
    let pricePerPound = {
      name : "Tarifa por peso",
      fee: 10.50
    }
    let data = [operatorFee, priorizationFee, pricePerPound]
    component.datarates = data
    expect(component.getIdRate("Tarifa por priorización").fee).toEqual(priorizationFee.fee);
  });

  it('add_rate, found rate', () => {
    let operatorFee = {
      name : "Tarifa por operación",
      fee: 15.50
    }
    let priorizationFee = {
      name : "Tarifa por priorización",
      fee: 5.50
    }
    let pricePerPound = {
      name : "Tarifa por peso",
      fee: 10.50
    }
    let data = [operatorFee, priorizationFee, pricePerPound]
    component.datarates = data
    component.addRates('Tarifa por priorización', 5.50, false)
    expect(component.getIdRate("Tarifa por priorización").fee).toEqual(priorizationFee.fee);
  });

  it('add_rate, not found rate', () => {
    let operatorFee = {
      name : "Tarifa por operación",
      fee: 15.50
    }
    let priorizationFee = {
      name : "Tarifa por priorización",
      fee: 5.50
    }
    let pricePerPound = {
      name : "Tarifa por peso",
      fee: 10.50
    }
    let data = [operatorFee, pricePerPound]
    component.datarates = data
    component.addRates('Tarifa por priorización', 5.50, false)
    expect(5.50).toEqual(priorizationFee.fee);
  });

});
