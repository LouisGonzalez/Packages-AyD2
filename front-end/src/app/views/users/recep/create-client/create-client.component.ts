import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Client } from '../../others/models/Client';
import { RecepService } from '../../others/services/recep.service';
//import Swal from 'sweetalert2';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';


@Component({
  selector: 'ngx-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  //Configuraciones para el mensaje
  duration = 2000;
  index = 1;
  hasIcon = true;
  destroyByClick = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  notification: NotificationsComponent;

  form:FormGroup = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    age: new FormControl(''),
    CUI: new FormControl(''),
    NIT: new FormControl('')
  })

  client: Client;
  constructor(protected ref: NbDialogRef<CreateClientComponent>, private recepService: RecepService, private toastrService: NbToastrService) {

  }

  cancel(){
    this.ref.close();
  }

  submit(){
    if(this.form.valid){
      this.client = this.form.value;
      this.recepService.addClient(this.client).pipe(
        )
      .subscribe(
        result => {
          this.ref.close(this.client);
          this.makeToast('success', null, 'Cliente agregado!');
        }
      )

    }
  }

  makeToast(status, title, body){
    this.showToast(status, title, body);
  }

  private showToast(type: NbComponentStatus, title: string, body: string){
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates
    };
    const titleContent = title ? `. ${title}` : '';
    this.index += 1;
    this.toastrService.show(
      body,
      `Operacion realizada con exito`,
      config)
  }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
  }

}
