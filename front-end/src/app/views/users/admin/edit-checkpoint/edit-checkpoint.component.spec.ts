import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCheckpointComponent } from './edit-checkpoint.component';

describe('EditCheckpointComponent', () => {
  let component: EditCheckpointComponent;
  let fixture: ComponentFixture<EditCheckpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCheckpointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCheckpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
