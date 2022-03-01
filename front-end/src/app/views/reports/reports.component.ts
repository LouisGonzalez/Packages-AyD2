import { Component, OnInit } from '@angular/core';
import { ADMINISTRATOR_MENU_ITEMS } from '../users/admin/menu';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menu = ADMINISTRATOR_MENU_ITEMS;

}
