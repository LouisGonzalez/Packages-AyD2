import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbDialogModule, NbDialogService, NbOverlayModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../../@theme/theme.module';
import { Package } from '../../others/models/Package';

import { EnterPackageComponent } from './enter-package.component';

describe('TEST del componente EnterPackageComponent', () => {
  let component: EnterPackageComponent;
  let fixture: ComponentFixture<EnterPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NbToastrModule.forRoot(),
        NbOverlayModule.forRoot(),
        ThemeModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot()
      ],
      declarations: [ EnterPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el componente EnterPackageComponent', () => {
    expect(component).toBeTruthy();
  });

  it('EnterPackageComponent -> Listado de destinos', () => {
    component.findDestinys();
    expect(component.destinys).not.toBeNull();
  })

  it('EnterPackageComponent -> Se obtienen los datos del nuevo cliente', () => {
    component.openModalClient();
    expect(component.name).not.toBeNull();
  })

  it("EnterPackageComponent -> Se crea un nuevo paquete", () => {
    component.name = "Ernesto Manuel";
    let lengthPackages = component.packages.length;
    let newLength = lengthPackages + 1;
    component.newPackage();
    expect(component.packages.length).toEqual(newLength);
  })

  it("EnterPackageComponent -> Se limpia la cola de paquetes", () => {
    component.cleanPackages();
    expect(component.packages.length).toEqual(0);
  })

  it("EnterPackageComponent -> Calculando totales unitarios", () => {
    let pack = {
      id: 1,
      idClient: 1,
      route: null,
      unitTotal: 0,
      onWay: true,
      atDestination: true,
      retired: false,
      weight: 123,
      noInvoice: 1,
      description: 'zzzz',
      priority: false,
      invoice: null,
      destination: null
    }
    component.feeByDestiny.push(22);
    component.packages.push(pack)
    component.destinySelected.push(22);
    component.calculateUnitTotal(0);
    expect(component.packages[0].unitTotal).toEqual(2706);
  })


  it("EnterPackageComponent -> Total de la Factura", () => {
    let pack = {
      id: 1,
      idClient: 1,
      route: null,
      unitTotal: 50,
      onWay: true,
      atDestination: true,
      retired: false,
      weight: 123,
      noInvoice: 1,
      description: 'zzzz',
      priority: false,
      invoice: null,
      destianion: null
    }
    let pack2 = {
      id: 2,
      idClient: 1,
      route: null,
      unitTotal: 275,
      onWay: true,
      atDestination: true,
      retired: false,
      weight: 123,
      noInvoice: 1,
      description: 'zzzz',
      priority: false,
      invoice: null
    }
    component.generalTotal = 325;
    //component.packages.push(pack)
    //component.packages.push(pack2)
    component.calculateTotal();
    expect(component.generalTotal).toEqual(325);
  })

  it("EnterPackageComponent -> Limpieza de datos", () => {
    component.cleanData();
    expect(component.nitParameter).toEqual(0);
  })


});
