import { Component, OnInit } from '@angular/core';
import { AuthPasswordService } from '../others/services/password/auth-password.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  form : FormGroup = new FormGroup ({
    password : new FormControl(null, [
      Validators.required,
      Validators.minLength(0)
    ]),
    confirmPassword : new FormControl(null, [
      Validators.required,
      Validators.minLength(0)
    ])
  })

  showMessages = {
    error : false,
    success : false,
  }

  user = {
    password : '',
    confirmPassword : ''
  };

  errors = [];
  messages = [];

  submitted = false;

  constructor(
    private api : AuthPasswordService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  resetPass() {
    this.form.controls['password'].setValue(this.user.password);
    this.form.controls['confirmPassword'].setValue(this.user.confirmPassword);
    if (this.form.valid) {
      let newUser;
      let id;
      this.api.changePassword(newUser, id) 
      .subscribe({
        next : (res) => {
          this.showMessages.success = true;
          this.messages.push('Se realizo el cambio de contraseña, con exito.');
            setTimeout(() => {
              this.form.reset();
              this.user.password = '';
              this.user.confirmPassword = '';
              this.router.navigate(['views']);
            }, 2000);
        },
        error : (err) => {
          this.showMessages.error = true;
          this.errors.push('Error mientras se realizaba el cambio de contraseña, vuelve a intentarlo.')
        }
      });
    } else {
      this.showMessages.error = false;
      this.errors.push('Las contraseñas deben de conincidir');
      this.errors.push('La contraseña debe de contener un un minimo de ' + this.getConfigValue('minLength') + ' caracteres');
    }
  }

  getConfigValue(val){
    switch (val) {
      case 'required':
        return true;
      case 'minLength':
        return 8;
      default:
        return null;
    }
  }

}
