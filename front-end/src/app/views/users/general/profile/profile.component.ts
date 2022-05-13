import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  type: string;
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user != null){
      if(this.user.type == 1){
        this.type = 'Administrador';
      } else if(this.user.type == 2){
        this.type = 'Operador'
      } else if(this.user.type == 3){
        this.type = 'Recepcionista'
      }
    }
  }

}
