import { Component, OnInit } from '@angular/core';
import { ADMINISTRATOR_MENU_ITEMS } from '../admin/menu';

@Component({
  selector: 'ngx-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  admin = false;
  operator = false;
  recep = false;

  constructor() { }

  seeUserType(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user.type == 1){
      this.admin = true;
    } else if(user.type == 2){
      this.operator = true;
    } else if(user.type == 3){
      this.recep = true;
    }
  }

  ngOnInit(): void {
    this.seeUserType();
  }

  menuAdmin = ADMINISTRATOR_MENU_ITEMS;

}
