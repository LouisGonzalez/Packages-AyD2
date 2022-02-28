import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssignamentOperatorCheckpointComponent } from './update-assignament-operator-checkpoint.component';

describe('UpdateAssignamentOperatorCheckpointComponent', () => {
  let component: UpdateAssignamentOperatorCheckpointComponent;
  let fixture: ComponentFixture<UpdateAssignamentOperatorCheckpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssignamentOperatorCheckpointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssignamentOperatorCheckpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
