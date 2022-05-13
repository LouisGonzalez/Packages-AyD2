import { Component, OnInit } from '@angular/core';
import { OPERATOR_MENU_ITEMS } from './menu';

@Component({
  selector: 'ngx-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  menu = OPERATOR_MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
