import { Component, OnInit } from '@angular/core';
import { LocalDataSource }from 'ng2-smart-table';
import { CheckpointsService } from '../../others/services/checkpoint/checkpoints.service';
import { CheckpointListTemplate } from '../../others/models/checkpoint-list-template';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-checkpoints-list',
  templateUrl: './checkpoints-list.component.html',
  styleUrls: ['./checkpoints-list.component.scss']
})
export class CheckpointsListComponent implements OnInit {

  settings = {
    actions: {
      columnTitle:'Ver',
      add: false,
      edit: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-search"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      queueCapacity: {
        title: 'Capacidad de cola',
        type: 'number',
      },
      operationFee: {
        title: 'Tarifa de operación',
        type: 'number',
      },
      packageOnQueue: {
        title: 'Paquetes en cola',
        type: 'number',
      },
      route: {
        title: 'Ruta',
        type: 'number',
      },
      active : {
        title: 'Estado',
        type: 'string',
      }
    }
  };

  notification : NotificationsComponent;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private checkpointService : CheckpointsService,
    private router: Router,
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.getAllCheckpointsAssigned();
  }

  private getAllCheckpointsAssigned(){
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user.id)
    this.checkpointService.getAllCheckpointsAssignedToOperator(user.id)
    .subscribe({
      next:(res) => {
        this.source.load(this.convertCheckpointList(res));
      },
      error:(res) => {
        this.notification.errors(400, 'Error mientras se obtenia la lista de puntos de control asignados.');
      }
    });
  }

  showPackages(event){
    console.log('entro aqui')
    this.router.navigate(['views', 'operator', 'packages-list', event.data['id']]);
  }

  private convertCheckpointList(data : any) {
    let array = [];
    for (const iterator of data) {
      let newCheckpointTemplate : CheckpointListTemplate = {
        id : iterator['id'],
        queueCapacity : iterator['queueCapacity'],
        packageOnQueue : iterator['packageOnQueue'],
        operationFee : iterator['operationFee'],
        route : iterator['route'],
        active : iterator['active'] == 1 || iterator['active'] ? 'Activo' : 'Desactivado'
      }
      array.push(newCheckpointTemplate);
    }
    return array;
  }

}
