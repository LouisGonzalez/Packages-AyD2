import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../../others/services/admin.service';
import { User } from '../../others/models/employee';
import * as global from '../../../GLOBAL';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ERROR_MIN = global.GLOBAL.ERROR_MIN;
  ERROR_NUMBER = global.GLOBAL.ERROR_NUMBER;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [ Validators.required ]),
    name: new FormControl('', [ Validators.required ]),
    lastname: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(7) ]),
    repitPassword: new FormControl('', [ Validators.required, Validators.minLength(7) ]),
    cui: new FormControl('', [ Validators.required ]),
    type: new FormControl('', [ Validators.required ]),
    activo: new FormControl(''),
    email: new FormControl('', [ Validators.required, Validators.email ]),
//    id: new FormControl('')
  })
  pass2: string;
  user: User;
  public identity: any;
  public token: any;

  errors = false;
  notification: NotificationsComponent;

  constructor(private adminService: AdminService, private router: Router, private toastrService: NbToastrService) { }

  submit(){
    this.form.value.activo = 1;
    console.log(this.form.value)
    if(this.form.valid){
      this.user = this.form.value;
      this.adminService.add(this.user).pipe(
        catchError(error => {
        this.notification.showToast(4, 'Error', `Error durante la creacion del usuario, intente nuevamente`, 2500);
        return EMPTY
        })
      )
      .subscribe(
        result => {
          this.notification.showToast(1, 'Agregado', `Empleado agregado correctamente`, 2500);
          this.router.navigate(['/views/users/admin']);
        },
      )
    } else {
      console.log('error form no valido');
    }
  }

  pruebas(){
    console.log(this.form.value.type)
  }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
  }

}

