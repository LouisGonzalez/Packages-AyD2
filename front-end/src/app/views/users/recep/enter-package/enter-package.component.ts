import { Component, ComponentRef, OnInit } from '@angular/core';
import { NbDialogService, NbIconLibraries, NbToastrService, NbWindowComponent } from '@nebular/theme';
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
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';

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
  priority: boolean[] = [];

  notification: NotificationsComponent;

  actualDate: any;
  generalTotal: number = 0;
  invoice: Invoice = { id:null, nitClient: null, subTotal: null, total: null, dateEmit: null, nit: null, myPackages: null};

  client: Client;
  name: string; lastname: string; address: string;
  age: number; CUI: number; NIT: number;
  nitParameter: number;

  constructor(iconsLibrary: NbIconLibraries, private recepService: RecepService, private dialogService: NbDialogService, private windowService: NbWindowService, private toastrService: NbToastrService) {
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
    this.client = null;
    this.recepService.getClient(this.nitParameter).subscribe(result => {
      console.log(this.nitParameter+' asfasdfsdfa');
      this.client = result;
      console.log(this.client)
      if(this.client != null){
        this.name = this.client.name;
        this.lastname = this.client.lastname;
        this.age = this.client.age;
        this.CUI = this.client.cui;
        this.NIT = this.client.nit;
        this.address = this.client.address;
      } else {
        this.notification.showToast(4, 'Not Found', `El cliente con el NIT: ${this.nitParameter} no existe`, 2500);
        this.openModalClient();
        console.log('no existe el cleinte')
      }
  },
  (error) => {
    console.log(error)
    this.notification.showToast(4, 'Not Found', `El cliente con el NIT: ${this.nitParameter} no existe`, 2500);
    this.cleanData();
    this.openModalClient();
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
          this.CUI = response.cui;
          this.NIT = response.nit;
          this.address = response.address;
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
        this.notification.showToast(3, 'Cuidado', `Debe elegir un usuario antes de ingresar un paquete`, 2500);
      }
    } else {
      //Modal de advertencia que indique que se debe elegir un usuario
      this.notification.showToast(3, 'Cuidado', `Debe elegir un usuario antes de ingresar un paquete`, 2500);
      console.log('Antes debe asignar un cliente')
    }
  }

  //Busca rutas segun el destino
  findRoutes(event, i){
    console.log(this.destinySelected[i])
    this.recepService.getDestinyById(this.destinySelected[i]).subscribe( result => {
      this.feeByDestiny[i] = result.fee;
      console.log(this.feeByDestiny[i])
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
      this.invoice.nit = this.NIT;
      this.invoice.subTotal = this.generalTotal;
      this.invoice.total = this.generalTotal;
      this.invoice.dateEmit = this.actualDate;
      console.log(this.invoice)
      this.recepService.createInvoice(this.invoice).subscribe(result => {
        for(let i = 0; i < this.packages.length; i++){
          this.packages[i].route = {
            id: this.routeSelected[i]
          }
          this.packages[i].destination = {
            id: this.destinySelected[i]
          }
          this.packages[i].onWay = false;
          this.packages[i].atDestination = false;
          this.packages[i].retired = false;
          this.packages[i].noInvoice = result.id;
          this.packages[i].invoice = result;

          if(this.priority[i] == undefined){
            this.priority[i] = false;
          }
          this.packages[i].priority = this.priority[i];
          this.recepService.creaatePackage(this.packages[i]).subscribe(result => {
            this.createQueue(result);
            this.cleanData();
          })
        }
        this.notification.showToast(1, 'Completado', `Factura realizada con exito`, 2500);
     })
    } else {
      //Aqui debe ir un modal
      this.notification.showToast(3, 'Cuidado', `Todos los paquetes deben ser llenados antes de su proceso`, 2500);
      console.log('todos los paquetes deben ser llenados')
    }

  }

  createQueue(pack: Package){
    let queue = {
      packages: pack,
      position: 0
    }
    this.recepService.createQueue(queue).subscribe(response => {

    })
  }

  cleanData(){
    this.cleanPackages();
    this.generalTotal = 0;
    this.name = ""; this.lastname = ""; this.CUI = 0; this.NIT=0; this.address = "", this.age=0;
    this.nitParameter = 0;
  }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService)
  }

}
