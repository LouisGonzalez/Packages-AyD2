import { Component, OnInit } from '@angular/core';
import { LocalDataSource }from 'ng2-smart-table';
import { CheckpointsService } from '../../others/services/checkpoint/checkpoints.service';
import { CheckpointListTemplate } from '../../others/models/checkpoint-list-template';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-checkpoint-list',
  templateUrl: './checkpoint-list.component.html',
  styleUrls: ['./checkpoint-list.component.scss']
})
export class CheckpointListComponent implements OnInit {

  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-edit"></i>',
      confirmDelete: true,
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
      pakageOnQueue: {
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
    },
    defaultStyle: false,
    actions: {
      columnTitle: 'Acciones',
      
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'editCheckpoint', title: '<i class="nb-compose"></i>' },
        { name: 'deleteCheckpoint', title: '<i class="nb-close-circled"></i>' },
      ],
      position: 'right'
    },
  };

  notification : NotificationsComponent;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private api : CheckpointsService,  
    private router: Router,
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.getAllCheckpints();
  }

  private getAllCheckpints(){
    this.api.getAllCheckpoints()
    .subscribe({
      next:(res) => {
        this.source.load(this.convertCheckpointList(res));
      },  
      error:(res) => {
        alert('Error mientras se obtenia la lista de puntos de control')
      }
    });
  }

  onCustomAction(event){
    switch (event.action) {
      case 'editCheckpoint':
        if(parseInt(event.data['pakageOnQueue']) > 20) {
          this.notification.showToast(4, 'Error', 'Error no se puede editar este punto de control debido a que tiene paquetes en cola.', 3000);
        } else {
          this.router.navigate(['views', 'admin', 'edit-checkpoint', event.data['id']]);
        }
        break;
      case 'deleteCheckpoint':
        console.log('delete');
        break;
    }
  }

  private convertCheckpointList(data : any) {
    let array = [];
    for (const iterator of data) {
      let newCheckpointTemplate : CheckpointListTemplate = {
        id : iterator['id'],
        queueCapacity : iterator['queueCapacity'],
        pakageOnQueue : iterator['packageOnQueue'],
        operationFee : iterator['operationFee'],
        route : iterator['route'],
        active : iterator['active'] == 1 || iterator['active'] ? 'Activo' : 'Desactivado'
      }
      array.push(newCheckpointTemplate);
    }
    return array;
  }

}
