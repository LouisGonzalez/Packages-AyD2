import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCheckpointComponent } from './create-checkpoint.component';

describe('CreateCheckpointComponent', () => {
  let component: CreateCheckpointComponent;
  let fixture: ComponentFixture<CreateCheckpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCheckpointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCheckpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
