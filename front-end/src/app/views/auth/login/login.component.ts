import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth'
import { User } from '../others/models/employee';
import { LoginService } from '../others/services/login.service';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
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
    }
  }

  private validateLogin(user: User){
    this.loginService.login(user.username, user.password).subscribe(response => {
      this.user = response;
      console.log(this.user[0].username)
      //  localStorage.setItem('token', this.token);
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
    })
  }




  ngOnInit(): void {
  }

}
