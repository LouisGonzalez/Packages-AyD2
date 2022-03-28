import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';

import { CreateDestinationComponent } from './create-destination.component';

describe('TEST del componente "CreateDestinationComponent"', () => {
  let component: CreateDestinationComponent;
  let fixture: ComponentFixture<CreateDestinationComponent>;

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
      ],
      declarations: [ CreateDestinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el CreateDestinaitonComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar el formulario valido', () => {
    let name = component.formDestination.controls['name'];
    let fee = component.formDestination.controls['fee'];
    let description = component.formDestination.controls['description'];
    
    name.setValue("Guatemla-Peten");
    fee.setValue("50.50");
    description.setValue("Destiono de Guatemala a Peten");

    expect(component.formDestination.invalid).toBeFalsy();
  })
});
