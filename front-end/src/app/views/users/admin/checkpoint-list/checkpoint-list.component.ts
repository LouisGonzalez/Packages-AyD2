import { Component, OnInit } from '@angular/core';
import { LocalDataSource }from 'ng2-smart-table';
import { CheckpointsService } from '../../others/services/checkpoint/checkpoints.service';
import { CheckpointListTemplate } from '../../others/models/checkpoint-list-template';

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
      columnTitle: 'Actions',
      
      add: false,
      edit: true,
      delete: true,
      
      position: 'right'
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private api : CheckpointsService) { }

  ngOnInit(): void {
    this.getAllCheckpints();
  }

  private getAllCheckpints(){
    this.api.getAllCheckpoints()
    .subscribe({
      next:(res) => {
        this.source.load(this.convertCheckpointList(res));
        console.log(res);
      },  
      error:(res) => {
        alert('Error mientras se obtenia la lista de puntos de control')
      }
    });
  }

  deleteRecord(event){
    console.log('delete');
  }

  updateRecord(event){
    console.log('update');
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

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
