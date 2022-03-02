import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpointsListComponent } from './checkpoints-list.component';

describe('CheckpointsListComponent', () => {
  let component: CheckpointsListComponent;
  let fixture: ComponentFixture<CheckpointsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckpointsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpointsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
