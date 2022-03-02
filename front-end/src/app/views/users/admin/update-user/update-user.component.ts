import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from '../../others/models/employee';
import { AdminService } from '../../others/services/admin.service';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';

@Component({
  selector: 'ngx-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @Input() userReceive: User;
  @Input() users: User[];
  @Input() source: LocalDataSource;

  activeAux: boolean;

  pass2: string;
  user: User;

  notification: NotificationsComponent;


  constructor(private adminService: AdminService, private router: Router, private toastrService: NbToastrService) { }

  submit(){
    if(this.activeAux == undefined){
      this.activeAux = false;
    }
    if(this.activeAux){
      this.userReceive.activo = 0;
    } else {
      this.userReceive.activo = 1;
    }
    this.adminService.updateUser(this.userReceive).subscribe(response => {
      //modal de que se actualizo al usuario
      this.notification.showToast(1, 'Realizado', `Informacion modificada con exito`, 2500);
      this.close();
    })
  }

  close(){
    document.getElementById('update-user')?.remove();
    this.updateInformation();
    this.router.navigate(['/views/users/admin/list-users']);
    document.getElementById('table-employeers').style.display = "block";
  }

  updateInformation(){
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].id == this.userReceive.id){
        this.users[i] = this.userReceive;
      }
      break;
    }
    this.source.load(this.users)
  }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService)
  }

}
