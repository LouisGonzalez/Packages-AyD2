import { Component, OnInit } from '@angular/core';
import { LocalDataSource }from 'ng2-smart-table';
import { CheckpointsService } from '../../others/services/checkpoint/checkpoints.service';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-checkpoints-list',
  templateUrl: './checkpoints-list.component.html',
  styleUrls: ['./checkpoints-list.component.scss']
})
export class CheckpointsListComponent implements OnInit {

  notification : NotificationsComponent;
  source: LocalDataSource = new LocalDataSource;

  settings = {
    noDataMessage: 'No exite ningun punto asignado a su usuario.',
    actions: {
      columnTitle:'Ver',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'search', title: '<i class="nb-search"></i>' }
      ]
    },
    columns: {
      description: {
        title: 'Nombre',
        type: 'string',
      },
      queueCapacity: {
        title: 'Capacidad de cola',
        type: 'number',
      },
      operationFee: {
        title: 'Tarifa de operación',
        type: 'number',
        valuePrepareFunction: (operationFee) => {
          return `Q${operationFee}`;
        }
      },
      packagesOnQueue: {
        title: 'Paquetes en cola',
        type: 'number',
      },
      route: {
        title: 'Ruta',
        type: 'number',
        valuePrepareFunction: (route) => {
          return `${route.name}`;
        }
      }
    }
  };

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
    console.log(user);
    this.checkpointService.getAllCheckpointsAssignedToOperator(user.cui)
    .subscribe({
      next:(res) => {
        this.source.load(res);
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

}
