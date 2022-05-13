import { Component, OnInit } from '@angular/core';
import { RECEPTIONIST_MENU_ITEMS } from './menu';

@Component({
  selector: 'ngx-recep',
  templateUrl: './recep.component.html',
  styleUrls: ['./recep.component.scss']
})
export class RecepComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menu = RECEPTIONIST_MENU_ITEMS;

}
