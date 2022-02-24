import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from '../../others/models/employee';
import { AdminService } from '../../others/services/admin.service';
import { UsersModule } from '../../users.module';

@Component({
  selector: 'ngx-activate-users',
  templateUrl: './activate-users.component.html',
  styleUrls: ['./activate-users.component.scss']
})
export class ActivateUsersComponent implements OnInit {

  users: User[];
  user: User;

  settings = {
    actions: {
      add: false,
      edit: false
    },
    delete: {
      //editButtonContent: '<i class="nb-edit"></i>',
      deleteButtonContent: '<i class="nb-checkmark"></i>',
      //cancelButtonContent: '<i class="nb-close"></i>',
      confirmDelete: true
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

  constructor(private adminService: AdminService) {
    this.getData();
  }

  getData(){
    this.adminService.getAllDeactivates().subscribe(response => {
      this.users = response;
      this.source.load(this.users)
    })
  }

  onDeleteConfirm(event): void {
    if(window.confirm('Estas seguro de activar a este usuario?')){
      this.user = event.data;
      this.user.activo = 1;
      this.adminService.updateUser(this.user).subscribe(data => {
        console.log('empleado desactivo')
        this.getData();
      })
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
  }

}
