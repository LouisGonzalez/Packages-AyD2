import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { SmartTableData } from '../../../../@core/data/smart-table';
import { User } from '../../others/models/employee';
import { AdminService } from '../../others/services/admin.service';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'ngx-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {


  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  users: User[];
  user: User;
  settings = {
    actions: {
      add: false,
      edit: false
    },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmEdit: true
    // },
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
      CUI: {
        title: 'CUI',
        type: 'number',
      },

    },

  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private service: SmartTableData, private adminService: AdminService, private router: Router) {
    this.getData();
  }

  getData(){
    this.adminService.getAllActivates().subscribe(response => {
      this.users = response;
      console.log(this.users[0].username);
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
    // if (window.confirm('Estas seguro de desactivar a este usuario?')) {
    //   this.user = event.data;
    //   this.user.activo = 0;
    //   this.adminService.updateUser(this.user).subscribe(data => {
    //     console.log('empleado desactivado')
    //     this.getData();
    //   })

    // } else {
    //   event.confirm.reject();
    // }
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
