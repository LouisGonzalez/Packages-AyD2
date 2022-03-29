import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../../@theme/theme.module';

import { DeliverPackageComponent } from './deliver-package.component';

describe('TEST del componente DeliverPackageComponent', () => {
  let component: DeliverPackageComponent;
  let fixture: ComponentFixture<DeliverPackageComponent>;

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
      ],
      declarations: [ DeliverPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el componente DeliverPackageComponent', () => {
    expect(component).toBeTruthy();
  });

  it('El paquete ha sido entregado', () => {

    let pack = {
      id: 1,
      route: 1,
      onWay: false,
      atDestination: true,
      retired: false,
      weight: 23,
      noInvoice: 1,
      unitTotal: 123,
      description: 'asfs',
      priority: false
    }
    let event = {
      data: pack
    }
    component.deliverPackage(event);
    expect(component.pack.retired).toEqual(true);
  })
});
