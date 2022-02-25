import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';
import { CheckpointsService } from '../../others/services/checkpoint/checkpoints.service';
import { Router } from '@angular/router';
import * as global from '../../../GLOBAL';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource }from 'ng2-smart-table';

@Component({
  selector: 'ngx-update-assignament-operator-checkpoint',
  templateUrl: './update-assignament-operator-checkpoint.component.html',
  styleUrls: ['./update-assignament-operator-checkpoint.component.scss']
})

export class UpdateAssignamentOperatorCheckpointComponent implements OnInit {

  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ERROR_MIN = global.GLOBAL.ERROR_MIN;
  ERROR_NUMBER = global.GLOBAL.ERROR_NUMBER;

  errors = false;
  notification : NotificationsComponent;
  data;
  selected;

  formOperatorAssigment : FormGroup = new FormGroup ({
    currentOperator : new FormControl ({ 
      value: '', 
      disabled: true 
    }, null),
    selectedOperator : new FormControl (null, [
      Validators.required
    ])
  });

  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      },
      lastname: {
        title: 'Apellido',
        type: 'string',
      },
      CUI: {
        title: 'CUI',
        type: 'number',
      }
    },
    defaultStyle: false,
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'selected', title: '<i class="nb-checkmark"></i>' }
      ],
      position: 'right'
    },
  };

  source: LocalDataSource = new LocalDataSource();

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
    this.getAllOperators();
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
          this.getOperator();
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

  onCustomAction(event){
    this.selected = event.data;
    this.formOperatorAssigment.controls['selectedOperator'].setValue(this.selected.name);
  }

  private getOperator() {
    this.api.getOperator(this.data.assignedOperator)
    .subscribe({
      next:(res) => {
        if (res[0] == null) {
          this.notification.errors(404, 'no se puede encontrar un operador activo con el ID: ' + this.data.assignedOperator );
        } else {
          this.formOperatorAssigment.controls['currentOperator'].setValue(res[0].name);
        }
        
      }, 
      error:(err) => {
        if (err.status == 404) {
          this.notification.errors(404, 'no existe un operador con el ID: ' + this.data.assignedOperator);
        } else {
          this.notification.errors(400, 'Mientras se obtenian los datos del operador asignado, vuelve a intentarlo.');
        }
      }
    });
  }

  private getAllOperators() {
    this.api.getAllOperators()
    .subscribe({
      next:(res) => {
        this.source.load(res);
      },  
      error:(res) => {
        this.notification.errors(400, 'Error mientras se obtenia la lista de operadores.');
      }
    });
  }

  modify_operator() { 
    if (this.formOperatorAssigment.valid) {
      this.data.assignedOperator = this.selected.id;
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
        this.notification.showToast(1, 'Modificado', `El operador fue asignado con exito.`, 2000);
        setTimeout(() => {
          this.formOperatorAssigment.reset();
          this.router.navigate(['views', 'admin' , 'checkpoints'])
        }, 2300);
      },
      error : (err) => {
        this.notification.errors(400, "Error mientras se asignaba el operador, vuelve a intentarlo.");
      }
    });
  }

  onCancel() {
    this.formOperatorAssigment.reset();
    this.router.navigate(['views', 'admin', 'checkpoints'])
  }

}
