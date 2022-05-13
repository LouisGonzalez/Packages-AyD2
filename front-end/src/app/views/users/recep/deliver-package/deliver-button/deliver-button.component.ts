import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-deliver-button',
  templateUrl: './deliver-button.component.html',
  styleUrls: ['./deliver-button.component.scss']
})
export class DeliverButtonComponent implements OnInit {

  @Input() rowData: any;
  @Output() click:EventEmitter<any> = new EventEmitter();
  constructor() { }

  onClick(){
    this.click.emit('hola mundo');
  }

  ngOnInit(): void {
  }

}
