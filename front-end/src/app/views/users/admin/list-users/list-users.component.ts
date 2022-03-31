import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { User } from '../../others/models/employee';
import { AdminService } from '../../others/services/admin.service';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'ngx-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {


  users: User[];
  user: User;
  settings = {
    actions: {
      columnTitle: 'Editar',
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
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      cui: {
        title: 'CUI',
        type: 'number',
      },
      type: {
        title: 'Tipo de Usuario',
        type: 'string',
        valuePrepareFunction: (type) => {
          if(type == 1) return 'Administrador'
          if(type == 2) return 'Operador'
          if(type == 3) return 'Recepcionista'
        },
      },
      activo: {
        title: 'Estado',
        type: 'string',
        valuePrepareFunction: (activo) => {
          if(activo == 1) return 'Activo'
          if(activo == 0) return 'Desactivo'
        }
      }
    },

  };

  source: LocalDataSource = new LocalDataSource();



  constructor(private adminService: AdminService) {
    this.source = this.adminService.getAll();
  }

  ngOnInit(): void {
  }


}
