import { Component, ComponentRef, OnInit } from '@angular/core';
import { NbDialogService, NbIconLibraries, NbWindowComponent } from '@nebular/theme';
import { Client } from '../../others/models/Client';
import { Destination } from '../../others/models/destination';
import { Package } from '../../others/models/Package';
import { Route } from '../../others/models/Route';
import { RecepService } from '../../others/services/recep.service';
import { CreateClientComponent } from '../create-client/create-client.component';
import { NbWindowService } from '@nebular/theme';
import { InvoiceComponent } from '../invoice/invoice.component';
import * as moment from 'moment'
import { Invoice } from '../../others/models/Invoice';

@Component({
  selector: 'ngx-enter-package',
  templateUrl: './enter-package.component.html',
  styleUrls: ['./enter-package.component.scss']
})
export class EnterPackageComponent implements OnInit {

  evaIcons = [];

  packages: Package[] =[];
  destinys: Destination[] = [];
  routes: Route[] = [];

  destinySelected: number[] = [];
  feeByDestiny: number[] = [];
  routeSelected: number[] = [];
  unitTotal: number[] = [];

  actualDate: any;
  generalTotal: number = 0;
  invoice: Invoice = { id:null, nitClient: null, subTotal: null, total: null, dateEmit: null};

  client: Client[];
  name: string; lastname: string;
  age: number; CUI: number; NIT: number;
  nitParameter: number;

  constructor(iconsLibrary: NbIconLibraries, private recepService: RecepService, private dialogService: NbDialogService, private windowService: NbWindowService) {
    this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
      .filter(icon => icon.indexOf('outline') === -1);

    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    this.findDestinys();
    this.actualDate = moment(new Date()).format('YYYY-MM-DD');
  }

  icons = {
    ionicons: [
      'search'
    ]
  }

  //listado de destinos inscritos
  findDestinys(){
    this.recepService.getAllDestinys().subscribe(response => {
      this.destinys = response;
    })
  }

  //Busqueda de cliente por NIT
  searchClient(){
    this.recepService.getClient(this.nitParameter).subscribe(result => {
      console.log(this.nitParameter+' asfasdfsdfa');
      this.client = result;
      if(this.client.length > 0){
        this.name = this.client[0].name;
        this.lastname = this.client[0].lastname;
        this.age = this.client[0].age;
        this.CUI = this.client[0].CUI;
        this.NIT = this.client[0].NIT;
      } else {
        console.log('no existe el cleinte')
      }
  })
  }

  //Modal para la creacion de un cliente
  openModalClient(){
    this.dialogService.open(CreateClientComponent)
      .onClose.subscribe(response => {
        if(response != undefined){
          this.name = response.name;
          this.lastname = response.lastname;
          this.age = response.age;
          this.CUI = response.CUI;
          this.NIT = response.NIT;

        }
      });
  }

  //Crea un nuevo paquete
  newPackage(){
    if(this.name != undefined){
      if(this.name != ""){
        const pack: Package = {} as Package;
        this.packages.push(pack);
        const actual = this.packages.length-1;
      } else {
        //Modal de advertencia que indique que se debe elegir un usuario
        console.log('Antes debe asignar un cliente')
      }
    } else {
      //Modal de advertencia que indique que se debe elegir un usuario
      console.log('Antes debe asignar un cliente')
    }
  }

  //Busca rutas segun el destino
  findRoutes(event, i){
    console.log(this.destinySelected[i])
    this.recepService.getDestinyById(this.destinySelected[i]).subscribe( result => {
      this.feeByDestiny[i] = result[0].fee;
      this.calculateUnitTotal(i);
      this.recepService.getRouteByDestiny(this.destinySelected[i]).subscribe(response => {
        this.routes = response;

      })

    })

  }

  calculateUnitTotal(i){
    if(this.packages[i] != undefined){
      if(this.packages[i].weight != undefined){
        if(this.destinySelected[i] != undefined){
          this.packages[i].unitTotal = this.packages[i].weight * this.feeByDestiny[i];
          this.calculateTotal();
        }
      }
    }
  }

  //limpia la cola de paquetes
  cleanPackages(){
    this.packages = [];
  }

  //Calcula el total general de la factura
  calculateTotal(){
    this.generalTotal = 0;
    for(let i = 0; i < this.packages.length; i++){
      this.generalTotal = this.packages[i].unitTotal + this.generalTotal;
    }
  }

  //Crea la factura para la transaccion
  createInvoice(){
    let aproved = true;
    if(this.packages.length > 0){
      for(let i = 0; i < this.packages.length; i++){
        if(this.packages[i].unitTotal == undefined){
          aproved = false;
          break
        }
      }
    } else {
      aproved = false;
    }
    if(aproved){
      this.invoice.nitClient = this.NIT;
      this.invoice.subTotal = this.generalTotal;
      this.invoice.total = this.generalTotal;
      this.invoice.dateEmit = this.actualDate;
      this.recepService.createInvoice(this.invoice).subscribe(result => {
        for(let i = 0; i < this.packages.length; i++){
          this.packages[i].route = this.routeSelected[i];
          this.packages[i].onWay = false;
          this.packages[i].atDestination = false;
          this.packages[i].retired = false;
          this.packages[i].idClient = this.client[0].id;
          this.packages[i].noInvoice = result.id;
          this.recepService.creaatePackage(this.packages[i]).subscribe(result => {

            console.log('proceso finalizado')
            this.cleanData();
          })
        }
     })
    } else {
      //Aqui debe ir un modal
      console.log('todos los paquetes deben ser llenados')
    }

  }

  cleanData(){
    this.cleanPackages();
    this.generalTotal = 0;
    this.name = ""; this.lastname = ""; this.CUI = 0; this.NIT=0;
  }

  ngOnInit(): void {
  }

}
