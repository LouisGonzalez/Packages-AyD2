import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RatesService } from '../../others/services/rates/rates.service';
import * as global from '../../../GLOBAL';
import { Rate } from '../../others/models/rate';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';
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

  datarates : Rate [];
  notification : NotificationsComponent;

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
    this.notification = new NotificationsComponent(this.toastrService);
    this.set_values();
  }

  set_rates() {
    if (this.formRates.valid) {
      // Mandar la peticion de crear
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
        this.notification.showToast(4, 'Error', 'Error mientras se obtenian las tarifas, vuelve a intentarlo.', 2500);
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
          ? this.notification.showToast(3, 'Precaución', 'Debido a que el campo de: ' + name + ', esta vacio, el valor por defecto sera 0.', 2500)
          : console.log("");  
          this.notification.showToast(1, 'Editado', name + ', modificado correctamente.', 2500);
        },
        error:() =>{
          this.notification.showToast(4, 'Error', 'Error mientras se agregaba la \"' + name + '\", vuelve a intentarlo.', 2500);
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
          ? this.notification.showToast(3, 'Precaución', 'Debido a que el campo de: ' + name + ', esta vacio, el valor por defecto sera 0.', 2500)
          : console.log("");
          this.notification.showToast(1, 'Agregado', name + ', agregado correctamente.', 2500);
        },
        error:() =>{
          this.notification.showToast(4, 'Error', 'Error mientras se agregaba la \"' + name + '\", vuelve a intentarlo.', 2500);
        }
      }); 
    }
  }

  onCancel() {
    this.formRates.reset();
    this.router.navigate(['views', 'admin'])
  }
}
