import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthPasswordService } from '../others/services/password/auth-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})

export class RequestPasswordComponent implements OnInit {

  form : FormGroup = new FormGroup ({
    email : new FormControl(null, [
      Validators.required,
      Validators.email
    ])
  })

  showMessages = {
    error : false,
    success : false,
  }

  user = {
    email : ''
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

  requestPass() {
    this.form.controls['email'].setValue(this.user.email);
    if (this.form.valid) {
      this.searchUserByEmail(this.user.email);
    } else {
      this.showMessages.error = false;
      this.errors.push('El correo electronico es obligatorio');
      this.errors.push('El correo electronico debe de tener el formato de: example@gmail.com');
    }
  }

  private searchUserByEmail(email){
    this.api.searchUserByEmail(email)
    .subscribe({
      next : (res) => {
        this.showMessages.error = false;
        this.sendEmailForgotPassword(res.email, res.username);
      },
      error : (err) => {
        this.showMessages.error = true;
        this.errors = [];
        if (err.status == 404) {
          console.log(err);
          this.errors.push('Error no existe un usuario registrado con el correo electrónico: "' + email +'", vuelve a intentarlo');
        } else {
          this.errors.push('Error mientras se enviaba el correo electrónico, vuelve a intentarlo');
        }
      }
    });
  }

  private sendEmailForgotPassword(email, useranme){
    const userForgotPassword = {
      mailTo: email,
      username: useranme
    }
    this.api.sendEmail(userForgotPassword)
      .subscribe({
        next : (res) => {
          this.showMessages.success = true;
          this.messages.push('Se a enviado el correo electrónico para restablecer la contraseña, por favor revisa tu correo.');
          setTimeout(() => {
            this.form.reset();
            this.user.email = '';
            this.router.navigate(['views', 'auth', 'login']);
          }, 3500);
        },
        error : (err) => {
          this.errors = [];
          console.log(err);
          this.showMessages.error = true;
          this.errors.push('Error mientras se enviaba el correo electrónico, vuelve a intentarlo')
        }
      });
  }
}
