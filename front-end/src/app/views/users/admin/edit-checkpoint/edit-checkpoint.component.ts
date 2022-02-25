import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';
import { CheckpointsService } from '../../others/services/checkpoint/checkpoints.service';
import { Router } from '@angular/router';
import * as global from '../../../GLOBAL';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-edit-checkpoint',
  templateUrl: './edit-checkpoint.component.html',
  styleUrls: ['./edit-checkpoint.component.scss']
})
export class EditCheckpointComponent implements OnInit {

  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ERROR_MIN = global.GLOBAL.ERROR_MIN;
  ERROR_NUMBER = global.GLOBAL.ERROR_NUMBER;

  errors = false;
  notification : NotificationsComponent;
  data;

  formEditCheckpoint : FormGroup = new FormGroup ({
    queueCapacity : new FormControl (null,  [
      Validators.required,
      Validators.min(0), 
      Validators.pattern('[0-9]+')
    ]),
    operationFee : new FormControl (null, [
      Validators.required,
      Validators.min(0), 
      Validators.pattern('[0-9]+(.[0-9]+)?')
    ]),
    description : new FormControl(null, null)
  });

  constructor( 
    private route: ActivatedRoute,
    private location: Location,
    private toastrService: NbToastrService,
    private api : CheckpointsService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.getCheckpoint();
  }

  private getCheckpoint() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getCheckpoint(id)
    .subscribe({
      next:(res) => {
        this.data = res;
        if (parseInt(this.data['packageOnQueue']) > 0) {
          this.notification.showToast(4, "Error", "Error no se puede editar el punto de control porque tiene paquetes en cola", 3000);
          setTimeout(() => {
            this.location.back();
          }, 2000);
        } else {
          this.formEditCheckpoint.controls['queueCapacity'].setValue(this.data.queueCapacity);
          this.formEditCheckpoint.controls['operationFee'].setValue(this.data.operationFee);          
          this.formEditCheckpoint.controls['description'].setValue(this.data.description);
        }
      }, 
      error:(err) => {
        if (err.status == 404) {
          this.notification.errors(404, 'un punto de control con el ID: ' + id);
        } else {
          this.notification.errors(400, 'Mientras se obtenian los datos del punto de control, vuelve a intentarlo.');
        }
        setTimeout(() => {
          this.location.back();
        }, 2000);
      }
    });
  }

  edit_checkpoint() {
    if (this.formEditCheckpoint.valid) {
      this.data.queueCapacity = parseInt(this.formEditCheckpoint.get('queueCapacity').value);
      this.data.operationFee = parseFloat(this.formEditCheckpoint.get('operationFee').value);
      this.data.description = this.formEditCheckpoint.get('description').value;
      this.service_edit(this.data);
    } else {  
      this.errors = true;
      return;
    }
    
  }

  service_edit(dataEdit) {
    this.api.putCheckpoint(dataEdit, dataEdit.id)
    .subscribe({
      next : (res) => {
        this.notification.showToast(1, 'Editado', `El punto de control se a modificado con exito.`, 2000);
        setTimeout(() => {
          this.formEditCheckpoint.reset();
          this.router.navigate(['views', 'admin' , 'checkpoints'])
        }, 2300);
      },
      error : (err) => {
        this.notification.errors(400, "Error mientras se editaba el punto de control, vuelve a intentarlo.");
      }
    });
  }

  onCancel() {
    this.formEditCheckpoint.reset();
    this.router.navigate(['views', 'admin', 'checkpoints'])
  }
}
