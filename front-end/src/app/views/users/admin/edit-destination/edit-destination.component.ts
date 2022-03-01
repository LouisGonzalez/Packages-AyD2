import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinationService } from '../../others/services/destination/destination.service';
import * as global from '../../../GLOBAL';
import { Destination } from '../../others/models/destination';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DestinationListTemplate } from '../../others/models/DestinationListTemplate';

@Component({
  selector: 'ngx-edit-destination',
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.scss']
})

export class EditDestinationComponent implements OnInit {

  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ERROR_MIN = global.GLOBAL.ERROR_MIN;
  ERROR_NUMBER = global.GLOBAL.ERROR_NUMBER;
  ADMIN_HOME = global.GLOBAL.ADMIN_HOME;

  destinationId: number;

  notification : NotificationsComponent;

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

  constructor (
    private route: ActivatedRoute,
    private destinationService : DestinationService, 
    private toastrService : NbToastrService,
    private router : Router ) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.getDestination();
  }

  private getDestination(){
    this.destinationId = Number(this.route.snapshot.paramMap.get('id'));
    this.destinationService.getDestination(this.destinationId).subscribe({
      next:(res) => {
        this.formDestination.controls['name'].setValue(res[0].name);
        this.formDestination.controls['description'].setValue(res[0].description);          
        this.formDestination.controls['fee'].setValue(res[0].fee);
      }, 
        error:(err) => {
          this.notification.showToast(3, 'Error', 'Hubo un error obteniendo los datos del destino seleccionado', 5000);
        }
      }
    )
  }

  public updateDestination() {
    if (this.formDestination.valid) {
      this.update(
        this.formDestination.get('name').value,
        parseFloat(this.formDestination.get('fee').value),
        this.formDestination.get('description').value
      );
    } else {
      this.formDestination.markAllAsTouched();
      return;
    }
  }

  private update(name, rate, description) {
    let destination : DestinationListTemplate = {
      name: name,
      fee: rate,
      description: description
    };
     this.destinationService.setDestination(destination, this.destinationId)
    .subscribe({
      next : (res) => {
        this.notification.showToast(1, 'Actualizado', `Destino ${name}, actualizado exitosamente.`, 5000);
        this.formDestination.reset();
        this.router.navigate(['views', 'admin' , 'destinations']);
      },
      error : () => {
        this.notification.showToast(4, 'Error', `Error mientras se actualizaba el destino ${name}, vuelve a intentarlo.`, 5000);
      }
    });
  }

  onCancel() {
    this.formDestination.reset();
    this.router.navigate(['views', 'admin' , 'destinations']);
  }
}
