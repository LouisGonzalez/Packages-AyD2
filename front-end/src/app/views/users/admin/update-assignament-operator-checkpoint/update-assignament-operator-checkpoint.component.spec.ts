import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';

import { UpdateAssignamentOperatorCheckpointComponent } from './update-assignament-operator-checkpoint.component';

describe('TEST del componente "UpdateAssignamentOperatorCheckpointComponent"', () => {
  let component: UpdateAssignamentOperatorCheckpointComponent;
  let fixture: ComponentFixture<UpdateAssignamentOperatorCheckpointComponent>;

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
      declarations: [ UpdateAssignamentOperatorCheckpointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssignamentOperatorCheckpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de existir el UpdateAssignamentOperatorCheckpointComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar el formulario valido', () => {
    let currentOperator = component.formOperatorAssigment.controls['currentOperator'];
    let operatorCUI  = component.formOperatorAssigment.controls['operatorCUI'];
    let selectedOperator = component.formOperatorAssigment.controls['selectedOperator'];

    currentOperator.setValue('Juan Gonzeles');
    operatorCUI.setValue('123456789');
    selectedOperator.setValue('123456789 - Mario Hernandez');

    expect(component.formOperatorAssigment.invalid).toBeFalsy();
  });
    
  it('Se selecciono un operador para ser asignado', () => {
    component.setOperator(12345678, "Manolo", "Antonio");
    expect(component.selected.cui).toEqual(12345678);
  });

  it('Boton Cancel', () => {
    component.onCancel()
    expect(component.formOperatorAssigment.valid).toBeFalsy();
  });

  it('Modify Operator formulario valido', () => {
    let currentOperator = component.formOperatorAssigment.controls['currentOperator'];
    let operatorCUI  = component.formOperatorAssigment.controls['operatorCUI'];
    let selectedOperator = component.formOperatorAssigment.controls['selectedOperator'];

    currentOperator.setValue('Juan Gonzeles');
    operatorCUI.setValue('123456789');
    selectedOperator.setValue('123456789 - Mario Hernandez');
    component.data = {
      assignedOperator: {
        cui: "12345678"
      }
    }
    component.selected = {
      cui:'1234657892'
    }
    component.modify_operator()
    expect(component.formOperatorAssigment.invalid).toBeFalsy();
  });

  it('Modify Operator formulario invalido', () => {
    component.modify_operator()
    expect(component.formOperatorAssigment.valid).toBeFalsy();
  });

  it('Search Operator, Not Pattern', () => {
    let operator = component.searchOperators('')
    expect(operator).toBeUndefined();
  });

  it('Search Operator, Pattern', () => {
    component.searchOperators('Ale')
    expect(true).toBeTruthy();
  });
  
});
