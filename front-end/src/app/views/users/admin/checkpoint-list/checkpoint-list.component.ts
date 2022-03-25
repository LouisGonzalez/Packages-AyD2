import { Component, OnInit } from '@angular/core';
import { LocalDataSource }from 'ng2-smart-table';
import { CheckpointsService } from '../../others/services/checkpoint/checkpoints.service';
import { CheckpointListTemplate } from '../../others/models/checkpoint-list-template';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';
import { CustomServerDataSource } from '../../others/models/CustomServerDataSource';

@Component({
  selector: 'ngx-checkpoint-list',
  templateUrl: './checkpoint-list.component.html',
  styleUrls: ['./checkpoint-list.component.scss']
})
export class CheckpointListComponent implements OnInit {

  notification : NotificationsComponent;
  source: CustomServerDataSource;
  showPerPage = 10;

  settings = {
    mode: 'external', 
    noDataMessage: 'No exite ningun punto de control en el sistema.',
    pager:{
      display: true,
      perPage: this.showPerPage,
    },
    columns: {
      description: {
        title: 'Nombre',
        type: 'string'
      },
      queueCapacity: {
        title: 'Capacidad de cola',
        type: 'number'
      },
      operationFee: {
        title: 'Tarifa de operación',
        type: 'number'
      },
      packagesOnQueue: {
        title: 'Paquetes en cola',
        type: 'number'
      },
      route: {
        title: 'Ruta',
        type: 'string',
        valuePrepareFunction: (route) => {
          return `${route.name}`;
        }
      },
      active : {
        title: 'Estado',
        type: 'string',
        valuePrepareFunction: (active) => {
          return `${active == 1 ? 'Activo' : 'Desactivado'}`;}
      },
      assignedOperator: {
        title: 'Operador Asignado',
        type: 'string',
        valuePrepareFunction: (assignedOperator) => {
          return `${assignedOperator.cui} ${assignedOperator.name} ${assignedOperator.lastname}`;}
      }  
    },
    defaultStyle: false,
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'editCheckpoint', title: '<i class="nb-edit"></i>' },
        { name: 'operatorCheckpoint', title: '<i class="ion-ios-people-outline"></i>' },
        { name: 'removeCheckpoint', title: '<i class="nb-trash"></i>' },
      ],
      position: 'right'
    },
  };

  constructor(
    private api : CheckpointsService,  
    private router: Router,
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.source = this.api.getAllCheckpointsPaginated();
  }

  onCustomAction(event){
    if(parseInt(event.data['packageOnQueue']) > 0){
      this.notification.showToast(4, 'Error', 'Error no se pueden realizar acciones sobre este punto de control debido a que tiene paquetes en cola.', 3000);
    } else{
      switch (event.action) {
        case 'editCheckpoint':
          this.router.navigate(['views', 'admin', 'edit-checkpoint', event.data['id']]);
          break;
        case 'operatorCheckpoint':
          this.router.navigate(['views', 'admin', 'update-assignament-operator', event.data['id']]);
          break;
        case 'removeCheckpoint':   
          this.deleteCheckpoint(event.data['id']);
          break;
      }
    }
  }

  private deleteCheckpoint(id : number) {
    if(window.confirm('¿Eliminar permanentemente el punto de control?')){
      this.api.deleteCheckpoint(id).subscribe({
        next:(res) => {
          this.notification.showToast(1, 'Exito', 'Punto de control eliminado exitosamente.', 3000);
          this.source.remove(id);
        },  
        error:(error) => {
          this.notification.showToast(3, 'Error', error.error , 4000);
        }
      })
    } 
  }

}
