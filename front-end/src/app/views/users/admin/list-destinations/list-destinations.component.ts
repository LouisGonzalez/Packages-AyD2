import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../others/services/destination/destination.service'; 
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';
import { CustomServerDataSource } from '../../others/models/CustomServerDataSource';

@Component({
  selector: 'ngx-list-destinations',
  templateUrl: './list-destinations.component.html',
  styleUrls: ['./list-destinations.component.scss']
})
export class ListDestinationsComponent implements OnInit {

  notification : NotificationsComponent;
  source: CustomServerDataSource;
  showPerPage = 10;

  settings = {
    mode: 'external', 
    noDataMessage: 'No exite ningun destino en el sistema.',
    pager:{
      display: true,
      perPage: this.showPerPage,
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
        { name: 'edit', title: '<i class="nb-edit"></i>' },
        { name: 'delete', title: '<i class="nb-trash"></i>' }
      ],
      position: 'right'
    }
  };

  constructor(
    private destinationService : DestinationService,  
    private router: Router,
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.source = this.destinationService.getAllDestinationsPaginated();
  }

  public onCustomAction(event){
    switch(event.action){
      case 'edit':
        this.router.navigate(['views', 'admin', 'edit-destination', event.data['id']]);    
        break;
      
      case 'delete':
        this.delete(event.data['id']);
        break;
    }  
  }

  private delete(id : number) {
    if(window.confirm('¿Eliminar permanentemente el destino?')){
      this.destinationService.deleteDestination(id).subscribe({
        next:(res) => {
          this.notification.showToast(1, 'Exito', 'Destino eliminado exitosamente.', 3000);
          this.source.remove(id);
        },  
        error:(error) => {
          this.notification.showToast(3, 'Error', error.error , 4000);
        }
      })
    } 
  }

}