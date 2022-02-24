import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinationService } from '../../others/services/destination/destination.service';
import * as global from '../../../GLOBAL';
import { Destination } from '../../others/models/destination';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-create-destination',
  templateUrl: './create-destination.component.html',
  styleUrls: ['./create-destination.component.scss']
})
export class CreateDestinationComponent implements OnInit {

  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ERROR_MIN = global.GLOBAL.ERROR_MIN;
  ERROR_NUMBER = global.GLOBAL.ERROR_NUMBER;

  /** Toastr */
  config: NbToastrConfig;

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
  formDestination : FormGroup = new FormGroup ({
    name : new FormControl(null, [
      Validators.required
    ]),
    fee : new FormControl(null, [
      Validators.required, 
      Validators.min(0), 
      Validators.pattern('[0-9]+(.[0-9]+)?')
    ]),
    description : new FormControl(null, null)
  });

  constructor(
    private api_destination : DestinationService, 
    private toastrService : NbToastrService,
    private router : Router ) { }

  ngOnInit(): void {
  }

  create_destination() {
    if (this.formDestination.valid) {
      this.service_create(
        this.formDestination.get('name').value,
        parseFloat(this.formDestination.get('fee').value),
        this.formDestination.get('description').value
      );
    } else {
      this.errors = true;
      return;
    }
  }

  service_create(nameDestintaion, rate, description) {
    let newDestination : Destination = {
      name: nameDestintaion,
      fee: rate,
      description: description
    };
    this.api_destination.createDestination(newDestination)
    .subscribe({
      next : (res) => {
        this.showToast(this.types[1], 'Agregado', `Destino: ${nameDestintaion}, agregado correctamente.`);
        this.formDestination.reset();
        setTimeout(() => {
          this.router.navigate(['views', 'admin']);
        }, 2700);
      },
      error : () => {
        this.showToast(this.types[4], 'Error', `Error mientras se agregaba el destino: ${nameDestintaion}, vuelve a intentarlo.`);
      }
    });
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
