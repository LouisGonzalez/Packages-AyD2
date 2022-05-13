import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Client } from '../../others/models/Client';
import { RecepService } from '../../others/services/recep.service';
@Component({
  selector: 'ngx-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clients: Client[];
  client: Client;
  names: string[] = [];

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      name: {
        title: 'Nombres',
        type: 'string',
      },
      lastname: {
        title: 'Apellidos',
        type: 'string',
      },
      age: {
        title: 'Edad',
        type: 'string',
      },
      cui: {
        title: 'CUI',
        type: 'string',
      },
      nit: {
        title: 'NIT',
        type: 'number',
      },
      address: {
        title: 'Direccion',
        type: 'string'
      }

    },

  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private recepService: RecepService) {
    this.getData();
  }

  openModalClient(){
    // this.dialogService.open(CreateClientComponent)
    //   .onClose.subscribe(name => name && this.names.push(name));
  }

  getData(){
    this.recepService.getAllClients().subscribe(response => {
      this.clients = response;
      this.source.load(this.clients)
    })
  }

  ngOnInit(): void {
  }


}
