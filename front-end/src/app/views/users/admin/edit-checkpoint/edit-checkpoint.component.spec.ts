import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';

import { EditCheckpointComponent } from './edit-checkpoint.component';

describe('TEST del componente "EditCheckpointComponent"', () => {
  let component: EditCheckpointComponent;
  let fixture: ComponentFixture<EditCheckpointComponent>;

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
      declarations: [ EditCheckpointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCheckpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe exisitir el componente EditCheckpoint', () => {
    expect(component).toBeTruthy();
  });

  it('Edit Checkpoint - formulario valido', () => {
    let data = {
      queueCapacity: null,
      operationFee: null,
      description: null
    }

    component.data = data;
    let queueCapacity = component.formEditCheckpoint.controls['queueCapacity'];
    let operationFee = component.formEditCheckpoint.controls['operationFee'];
    let name = component.formEditCheckpoint.controls['description']
  
    queueCapacity.setValue('85');
    operationFee.setValue('25.50');
    name.setValue('Punto de control 1');
    component.edit_checkpoint()
    expect(component.formEditCheckpoint.invalid).toBeFalsy();
  });

  it('Edit Checkpoint - formulario invalido', () => {
    component.edit_checkpoint()
    expect(component.formEditCheckpoint.invalid).toBeTruthy();
  });

  it('Cancel Edit Checkpoint', () => {
    component.onCancel()
    expect(component.formEditCheckpoint.valid).toBeFalsy();
  });
});
