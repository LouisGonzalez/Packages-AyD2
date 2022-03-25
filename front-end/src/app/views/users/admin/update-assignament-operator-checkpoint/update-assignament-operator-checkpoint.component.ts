import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';
import { CheckpointsService } from '../../others/services/checkpoint/checkpoints.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import * as global from '../../../GLOBAL';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource }from 'ng2-smart-table';
import { OperatorService } from '../../others/services/operator/operator.service';

@Component({
  selector: 'ngx-update-assignament-operator-checkpoint',
  templateUrl: './update-assignament-operator-checkpoint.component.html',
  styleUrls: ['./update-assignament-operator-checkpoint.component.scss']
})

export class UpdateAssignamentOperatorCheckpointComponent implements OnInit {

  @ViewChild("operatorsSearchInput") operatorsSearchInput: ElementRef;

  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ERROR_MIN = global.GLOBAL.ERROR_MIN;
  ERROR_NUMBER = global.GLOBAL.ERROR_NUMBER;

  errors = false;
  notification : NotificationsComponent;
  data;
  selected;

  //Variables para busqueda de operadores
  operatorsSrc: string;
  operatorsData: any = null;
  operatorsLoading: boolean = false;

  formOperatorAssigment : FormGroup = new FormGroup ({
    currentOperator : new FormControl ({ 
      value: '', 
      disabled: true 
    }, null),
    operatorCUI: new FormControl(null, null),
    selectedOperator : new FormControl (null, 
      Validators.required
    )
  });

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private toastrService: NbToastrService,
    private api : CheckpointsService,
    private operatorService: OperatorService,
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
          this.formOperatorAssigment.controls['currentOperator'].setValue(this.data.assignedOperator.cui + ' - '+ this.data.assignedOperator.name);
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

  modify_operator() { 
    if (this.formOperatorAssigment.valid) {
      this.data.assignedOperator = {
        cui: this.selected.cui
      }
      this.service_edit(this.data);
    } else {
      this.errors = true;
      return;
    }
  }

  /**
   * Procedimiento que llama a la funcion getOperators del servicio
   * OperatorService para obtener todas la rutas que coinciden con 
   * el patron de busqueda que se recibe como parametro. Los datos
   * obtenidos se almacenan en la variable routesData.
   * @param pattern Patron de busqueda
   */
  public searchOperators(pattern: string){
    if(pattern != ''){
      this.operatorsLoading = true;
      this.operatorsData = this.operatorService.getOperators(pattern).pipe(
        finalize(() => this.operatorsLoading = false)
      );
    } else this.operatorsData = null;
  }

  service_edit(dataEdit) {
    this.api.putOperatorCheckpoint(dataEdit, dataEdit.id)
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

  public setOperator(cui: number, name: string, surname: string){
    this.formOperatorAssigment.controls['selectedOperator'].setValue(cui + ' - ' + name);
    this.selected = {
      cui: cui,
    };
    this.operatorsData = null;
    this.operatorsSearchInput.nativeElement.value = '';
  }

  onCancel() {
    this.formOperatorAssigment.reset();
    this.router.navigate(['views', 'admin', 'checkpoints'])
  }

  /**
   * Procedimiento que se encarga de establecer el tipo de borde
   * del elemento html que se recibe como parametro.
   * @param event Evento disparado
   */
  public setHoverBorder(event: MouseEvent) {
    const newsImage: HTMLDivElement = <HTMLDivElement>event.target;
    if (event.type === 'mouseenter') {
      newsImage.style.border = 'ridge';
    } else if (event.type === 'mouseleave') {
      newsImage.style.border = 'none';
    }
}
}
