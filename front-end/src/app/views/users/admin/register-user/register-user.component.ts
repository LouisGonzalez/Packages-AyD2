import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import Swal from 'sweetalert2';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../../others/services/admin.service';
import { User } from '../../others/models/employee';

@Component({
  selector: 'ngx-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {


  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl(''),
    CUI: new FormControl(''),
    type: new FormControl(''),
    active: new FormControl(''),
    email: new FormControl(''),
//    id: new FormControl('')
  })
  pass2: string;
  user: User;
  public identity: any;
  public token: any;

  constructor(private adminService: AdminService, private router: Router) { }

  submit(){
    this.form.value.active = 1;
    console.log(this.form.value)
    if(this.form.valid){
      this.user = this.form.value;
      this.adminService.add(this.user).pipe(
        // catchError(error => {
        //   Swal.fire({
        //     icon: 'error',
        //     title: ':(',
        //     text: error
        //   })
        //   return EMPTY
        // })
      )
      .subscribe(
        result => {
          // Swal.fire({
          //   title: ':D',
          //   text: 'Employee added succesfully',
          //   icon: 'success'
          // })
          this.router.navigate(['/views/users/admin']);
        }
      )
    } else {
      console.log('error form no valido');
    }
  }

  pruebas(){
    console.log(this.form.value.type)
  }

  ngOnInit(): void {
  }

}

