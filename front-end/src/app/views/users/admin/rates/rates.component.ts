import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RatesService } from '../../others/services/rates.service';
import * as global from '../../../GLOBAL';
import { Rate } from '../../others/models/rate';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
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

  errorOperationFee = false;
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
      )
  });

  constructor(private api_rates : RatesService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }

  set_rates() {
    if (this.formRates.valid) {
      // Mandar la peticion de crear
      let newRate : Rate = {
        ratename: 'Tarifa de operación',
        rate: parseFloat(this.formRates.get('operatorFee').value)
      }
      console.log(newRate);
      // Obj1, Obj2
      // Obj[]
      this.api_rates.postRates(newRate)
      .subscribe({
        next : (res) => {
          this.showToast(this.types[1], 'Agregado', 'Tarifa por operación agregado correctamente.');
          this.formRates.reset();
        },
        error:() =>{
          this.showToast(this.types[4], 'Error', 'Error mientras se agregaba la tarifa por operación vuelve a intentarlo.');
        }
      });
    } else {
      this.errorOperationFee = true;
      return;
    }
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
