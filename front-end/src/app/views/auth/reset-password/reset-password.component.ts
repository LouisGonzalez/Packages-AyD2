import { Component, OnInit } from '@angular/core';
import { AuthPasswordService } from '../others/services/password/auth-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as e from 'cors';

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

  employee = null;

  constructor(
    private api : AuthPasswordService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  resetPass() {
    // Obteniendo el Token
    const tokenPassword = this.route.snapshot.paramMap.get('tokenPassword');
    this.form.controls['password'].setValue(this.user.password);
    this.form.controls['confirmPassword'].setValue(this.user.confirmPassword);
    if (this.form.valid) {
      const changePasswordDTO = {
        password : this.user.password,
        confirmPassword : this.user.confirmPassword,
        tokenPassword : tokenPassword
      }
      console.log(changePasswordDTO);      
      this.api.changePassword(changePasswordDTO) 
      .subscribe({
        next : (res) => {
          this.showMessages.error = false;
          this.errors = [];
          this.showMessages.success = true;
          this.messages.push('Se realizo el cambio de contraseña, con exito.');
            setTimeout(() => {
              this.form.reset();
              this.user.password = '';
              this.user.confirmPassword = '';
              this.router.navigate(['views', 'auth', 'login']);
            }, 3500);
        },
        error : (err) => {
          this.errors = [];
          this.showMessages.error = true;
          if (err.status == 400) {
            this.errors.push("Las contraseñas no coinciden."); 
          } else if (err.status == 404) {
            this.errors.push("No se encuentra registrado un empleado con las credenciales indicadas."); 
          } else {
            this.errors.push("Error al restablecer la contraseñas, por favor vuelve a intentarlo.")
          }
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
