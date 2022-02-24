import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RatesService } from '../../others/services/rates/rates.service';
import * as global from '../../../GLOBAL';
import { Rate } from '../../others/models/rate';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  
  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ERROR_MIN = global.GLOBAL.ERROR_MIN;
  ERROR_NUMBER = global.GLOBAL.ERROR_NUMBER;

  OPERATION_FEE = 'Tarifa por operación';
  PRICE_PER_POUND = 'Tarifa por libra';
  PRIORIZATION_FEE = 'Tarifa por priorización';

  /** Toastr */
  config: NbToastrConfig;

  datarates : Rate [];
  index = 1;
  destroyByClick = true;
  duration = 2500;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  errors = false;
  formRates : FormGroup = new FormGroup ({
    /** 
     * Primer parametro: valor incial
     * Segundo parametro: validators
    */  
    operatorFee : new FormControl(null, [ 
       Validators.min(0), 
       Validators.pattern('[0-9]+(.[0-9]+)?')
      ] 
    ),
    priorizationFee : new FormControl(null, [ 
      Validators.min(0), 
      Validators.pattern('[0-9]+(.[0-9]+)?')
     ] 
     ),  
    pricePerPound: new FormControl(null, [ 
      Validators.min(0), 
      Validators.pattern('[0-9]+(.[0-9]+)?')
     ] 
     ),  
  });

  constructor(
    private api_rates : RatesService, 
    private toastrService: NbToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.set_values();
  }

  set_rates() {
    if (this.formRates.valid) {
      // Mandar la peticion de crear
      console.log(this.formRates);
      this.addRates(this.OPERATION_FEE, this.formRates.get('operatorFee').value, true)  
      this.addRates(this.PRIORIZATION_FEE, this.formRates.get('priorizationFee').value, false)  
      this.addRates(this.PRICE_PER_POUND, this.formRates.get('pricePerPound').value, false);
    } else {
      this.errors = true;
      return;
    }
  }

  private set_values(){
    this.api_rates.getRates()
    .subscribe({
      next:(res) => {
        this.addField(res);
      },
      error:(err) => {
        this.showToast(this.types[4], 'Error', 'Error mientras se obtenian las tarifas, vuelve a intentarlo.');
      }
    });
  }

  private getIdRate(name) : Rate {
    return this.datarates.find( function(item){
        return item.ratename === name;
    });
  }

  private addField(data){
    this.datarates = data;
    for (const iterator of data) {
      console.log("Aqui: " + iterator);
      if (iterator['ratename'] === 'Tarifa por operación') {
        this.formRates.controls['operatorFee'].setValue(iterator['rate'])
      } else if (iterator['ratename'] === 'Tarifa por priorización') {
        this.formRates.controls['priorizationFee'].setValue(iterator['rate'])
      } else {
        this.formRates.controls['pricePerPound'].setValue(iterator['rate'])
      }
    }
  }

  private addRates(name, fee, redirect) {
    let newRate : Rate;
    let rateSearch = this.getIdRate(name);
    if (rateSearch != null) {
      newRate = {
        id : rateSearch.id,
        ratename : name,
        rate : fee == null ? 0 : parseFloat(fee)
      }
      this.api_rates.putRates(newRate, rateSearch.id)
      .subscribe({
        next : (res) => {
          if (redirect) {
            setTimeout(() => {
              this.formRates.reset();
              this.router.navigate(['views', 'admin']);
            }, 3000);
          }
          fee == null 
          ? this.showToast(this.types[3], 'Precaución', 'Debido a que el campo de: ' + name + ', esta vacio, el valor por defecto sera 0.')
          : console.log("");  
          this.showToast(this.types[1], 'Editado', name + ', modificado correctamente.');
        },
        error:() =>{
          this.showToast(this.types[4], 'Error', 'Error mientras se agregaba la \"' + name + '\", vuelve a intentarlo.');
        }
      }); 
    } else {
      newRate = { 
        ratename: name,
        rate: fee == null ? 0 : fee
      };
      this.api_rates.postRates(newRate)
      .subscribe({
        next : (res) => {
          if (redirect) {
            setTimeout(() => {
              this.formRates.reset();
              this.router.navigate(['views', 'admin']);
            }, 2700);
          }
          fee == null 
          ? this.showToast(this.types[3], 'Precaución', 'Debido a que el campo de: ' + name + ', esta vacio, el valor por defecto sera 0.')
          : console.log("");
          this.showToast(this.types[1], 'Agregado', name + ', agregado correctamente.');
        },
        error:() =>{
          this.showToast(this.types[4], 'Error', 'Error mientras se agregaba la \"' + name + '\", vuelve a intentarlo.');
        }
      }); 
    }
  }

  onCancel() {
    this.router.navigate(['views', 'admin'])
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
