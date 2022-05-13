import { Component, Input, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  //@Input() totalProducts: number[];
  //@Input() idClient: number;
  @Input() nameClient: string;
  //@Input() lastnameClient: string;

  total: number = 0;

  constructor(public windowRef: NbWindowRef) {
//    this.calculateTotal();
  }

  // calculateTotal(){
  //   for(let i = 0; i < this.totalProducts.length; i++){
  //     this.total = this.total + this.totalProducts[i];
  //   }
  // }

  close(){
    this.windowRef.close();
  }

  ngOnInit(): void {
  }


}
