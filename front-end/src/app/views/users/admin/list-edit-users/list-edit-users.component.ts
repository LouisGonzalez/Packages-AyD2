import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from '../../others/models/employee';
import { AdminService } from '../../others/services/admin.service';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'ngx-list-edit-users',
  templateUrl: './list-edit-users.component.html',
  styleUrls: ['./list-edit-users.component.scss']
})
export class ListEditUsersComponent implements OnInit {


  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  users: User[];
  user: User;
  settings = {
    actions: {
      columnTitle: 'Editar',
      add: false,
      edit: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-edit"></i>',
      confirmDelete: true,
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
        }
      }
    },

  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private adminService: AdminService, private router: Router) {
    this.getData();
  }

  getData(){
    this.adminService.getAllActivatesNotAdmin().subscribe(response => {
      this.users = response;
      console.log(this.users)
      this.source.load(this.users)
    })
  }

  deactivateConfirm(event): void{
    if(window.confirm('Estas seguro de desactivar a este usuario?')){
    } else {
      event.confirm.reject();
    }
  }

  goToEdit(event){
    console.log('hola mundo')

  }

  onDeleteConfirm(event): void {
    const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(UpdateUserComponent);
    const componentRef = this.container.createComponent(dynamicComponentFactory);
    componentRef.instance.userReceive = event.data;
    componentRef.instance.users = this.users;
    componentRef.instance.source = this.source;
    document.getElementById('table-employeers').style.display = "none";
  }

  onCustom(event): void {
    console.log('hola mundo');
  }

  ngOnInit(): void {
  }

}
