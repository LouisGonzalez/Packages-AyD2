import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth'
import { User } from '../others/models/employee';
import { LoginService } from '../others/services/login.service';
import * as global from '../../GLOBAL';
import { NbToastrService } from '@nebular/theme';
import { NotificationsComponent } from '../../users/others/source/notifications/notifications.component';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ERROR_MIN = global.GLOBAL.ERROR_MIN;
  ERROR_NUMBER = global.GLOBAL.ERROR_NUMBER
  errors = false;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(7) ])
  })
  username: string = "";
  password: string = "";
  user: User;
  public identity: any;
  public token: any;

  notification: NotificationsComponent;

  constructor(private router: Router, private loginService: LoginService, private toastrService: NbToastrService){}

  submit(){
    if(this.form.valid){
      this.validateLogin(this.form.value);
    } else {
      this.errors = true;
    }
  }

  private validateLogin(user: User){
    this.loginService.login(user.username, user.password).subscribe(response => {
      this.token = response.token;
      console.log(this.token);
      this.user = response.employee;
      console.log(this.user)
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('token', this.token);
      this.loginService.setUserSesion(true);
      if(this.user.type == 1){
         //Admin
        this.router.navigate(['/views/users/admin'])
      } else if(this.user.type == 2){
        //Operario
        this.router.navigate(['/views/users/operator'])
      } else if(this.user.type == 3){
        //Recepcionista
        this.router.navigate(['/views/users/recep'])
      }
    },
    (error) => {
      this.notification.showToast(4, 'Error', `Credenciales invalidas`, 2500);
    })
  }




  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
  }

}
