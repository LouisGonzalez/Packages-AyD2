import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DialogNamePromptComponent } from '../../../../pages/modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { Client } from '../../others/models/Client';
import { RecepService } from '../../others/services/recep.service';
import { CreateClientComponent } from '../create-client/create-client.component';
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
      id: {
        title: 'ID',
        type: 'number',
      },
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
      CUI: {
        title: 'CUI',
        type: 'string',
      },
      NIT: {
        title: 'NIT',
        type: 'number',
      },

    },

  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private recepService: RecepService, private dialogService: NbDialogService) {
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
