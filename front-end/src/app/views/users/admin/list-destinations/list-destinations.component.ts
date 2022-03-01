import { Component, OnInit } from '@angular/core';
import { LocalDataSource }from 'ng2-smart-table';
import { DestinationService } from '../../others/services/destination/destination.service'; 
import { DestinationListTemplate } from '../../others/models/DestinationListTemplate'
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-list-destinations',
  templateUrl: './list-destinations.component.html',
  styleUrls: ['./list-destinations.component.scss']
})
export class ListDestinationsComponent implements OnInit {

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
      name: {
        title: 'Nombre',
        type: 'string',
      },
      description: {
        title: 'Descripcion',
        type: 'string',
      },
      fee: {
        title: 'Tarifa',
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
        { name: 'editCheckpoint', title: '<i class="nb-edit"></i>' },
      ],
      position: 'right'
    }
  };

  notification : NotificationsComponent;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private destinationService : DestinationService,  
    private router: Router,
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.getDestinations();
  }

  /**
   * Procedimiento que se encarga de obtener todos los destinos
   */
   private getDestinations(){
    this.destinationService.getAllDestinations()
    .subscribe({
      next:(res) => {
        this.source.load(this.convertDestinationList(res));
      },  
      error:(res) => {
        this.notification.errors(400, 'Error mientras se obtenia la lista de destinos.');
      }
    });
  }

  public onCustomAction(event){
    this.router.navigate(['views', 'admin', 'edit-destination', event.data['id']]);
  }

  /**
  * Procedimiento que se encarga crear un nuevo template para 
  * en base a los destinos obtenidos para organizar los datos en la tabla. 
  * @param data 
  * @returns 
  */
  private convertDestinationList(data : any) {
    let array = [];
    for (const iterator of data) {
      let newDestinationTemplate : DestinationListTemplate = {
        id : iterator['id'],
        name: iterator['name'],
        description: iterator['description'],
        fee: iterator['fee']
      }
      array.push(newDestinationTemplate);
    }
    return array;
  }
}


