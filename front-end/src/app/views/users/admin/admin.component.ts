import { Component, OnInit } from '@angular/core';
import { ADMINISTRATOR_MENU_ITEMS } from './menu';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
})

export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menu = ADMINISTRATOR_MENU_ITEMS;

}
