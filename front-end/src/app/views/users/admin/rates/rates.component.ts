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

@Component({
  selector: 'ngx-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  
  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ERROR_MIN = global.GLOBAL.ERROR_MIN;
  ERROR_NUMBER = global.GLOBAL.ERROR_NUMBER;

  /** Toastr */
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 5000;
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
       Validators.required, 
       Validators.min(0), 
       Validators.pattern('[0-9]+(.[0-9]+)?')
      ] 
    ),
    priorizationFee : new FormControl(null, [ 
      Validators.required, 
      Validators.min(0), 
      Validators.pattern('[0-9]+(.[0-9]+)?')
     ] 
     ),  
    pricePerPound: new FormControl(null, [ 
      Validators.required, 
      Validators.min(0), 
      Validators.pattern('[0-9]+(.[0-9]+)?')
     ] 
     ),  
  });

  constructor(private api_rates : RatesService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }

  set_rates() {
    if (this.formRates.valid) {
      // Mandar la peticion de crear
      this.createRate('Tarifa por operación', parseFloat(this.formRates.get('operatorFee').value));
      this.createRate('Tarifa por priorización', parseFloat(this.formRates.get('priorizationFee').value));
      this.createRate('Tarifa por libra', parseFloat(this.formRates.get('pricePerPound').value));
    } else {
      this.errors = true;
      return;
    }
  }

  private createRate(name, fee) {
    let newRate : Rate = {
      ratename: name,
      rate: fee
    };
    this.api_rates.postRates(newRate)
    .subscribe({
      next : (res) => {
        this.showToast(this.types[1], 'Agregado', name + ', agregado correctamente.');
        this.formRates.reset();
      },
      error:() =>{
        this.showToast(this.types[4], 'Error', 'Error mientras se agregaba la \"' + name + '\", vuelve a intentarlo.');
      }
    });
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
