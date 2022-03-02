import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth'
import { User } from '../others/models/employee';
import { LoginService } from '../others/services/login.service';
import * as global from '../../GLOBAL';
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
user: User[];
  public identity: any;
  public token: any;

  constructor(private router: Router, private loginService: LoginService){}

  submit(){
    if(this.form.valid){
      this.validateLogin(this.form.value);
    } else {
      this.errors = true;
    }
  }

  private validateLogin(user: User){
    this.loginService.login(user.username, user.password).subscribe(response => {
      this.user = response;
      if(this.user.length > 0){
        localStorage.setItem('user', JSON.stringify(this.user[0]));
        if(this.user[0].type == 1){
          //Admin
          this.router.navigate(['/views/users/admin'])
        } else if(this.user[0].type == 2){
          //Operario
          this.router.navigate(['/views/users/operator'])
        } else if(this.user[0].type == 3){
          //Recepcionista
          this.router.navigate(['/views/users/recep'])
        }
      }
    })
  }




  ngOnInit(): void {
  }

}
